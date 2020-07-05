var readlineSync = require('readline-sync');
var fs = require('fs');

var contacts = [];
function loadData() {
  var fileContent = fs.readFileSync('./data.json');
  contacts = JSON.parse(fileContent);
}

function showContacts() {
  for(var contact of contacts) {
    console.log(contact.name, contact.phone);
  }
}

function createContacts() {
  var numbers = readlineSync.question('Nhap so nguoi can them: ');
  for(var i=0;i<numbers;i++) {
    var name = readlineSync.question('name: ');
    var phone = readlineSync.question('phone: ');
    var contact = {
      name: name,
      phone: parseInt(phone)
    }
    contacts.push(contact);
  }
}

function reContacts() {
  var k = 0;
  var name = readlineSync.question('Nhap ten can sua: ');
  for(var contact of contacts) {
    if(name === contact.name) {
      var phone = readlineSync.question('So dien thoai sua thanh: ');
      contact.phone = phone;
      k=1;
      break;
    }
  }
  if(k==0) console.log('Khong co ten trong contact');
}

function deleteContacts() {
  var name = readlineSync.question('Nhap ten can xoa: ');
  var found = contacts.findIndex(function isName(element) {
    return element.name === name;
  });
  if(found === -1) console.log('Khong co ten trong contact');
  else 
  contacts.splice(found,1);
}


/****************search Contact*******************/
function change_alias(alias) {
  var str = alias;
 str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  str = str.trim(); 
  return str;
}

function searchContact() {
  var k = 0;
  var search = readlineSync.question('Ban muon tim kiem bang name hay phone: ');
  if(search === 'name') {
    var b = readlineSync.question('Nhap ten can tim: ');
    for(var contact of contacts) {
      if(change_alias(contact.name.toUpperCase()) == b.toUpperCase()) {
      console.log(contact.name, contact.phone);
      k++;
      }
    }
  }
  if(search === 'phone') {
    var a = readlineSync.question('Nhap so dien thoai can tim: ');
    a = Number(a);
    for(x of contacts){
      if(Number(x.phone).toString().indexOf(Number(a).toString())>=0){
         console.log(x.name, x.phone);
         k++;
      }
    }
  }
  if(k==0)
  console.log('Ban nhap sai yeu cau ');
}

/////////////////////////////////////////////

function saveAndExit() {
  var content = JSON.stringify(contacts);
  fs.writeFileSync('./data.json',content, { encoding: 'utf8'});
}


function menu() {  
  while(1) {
    console.log('1.Hien thong tin sinh vien ');
    console.log('2.Nhap du lieu contact ');
    console.log('3.Sua du lieu contact ');
    console.log('4.Tim kiem contact ');
    console.log('5.Xoa contact ');
    console.log('6.Thoat ');
    var option = readlineSync.question('Nhap lua chon cua ban ');
    if(option==1) {
      showContacts();
    }
    if(option==2) {
      createContacts();
    }
    if(option==3) {
      reContacts();
    }
    if(option==4) {
      searchContact();
    }
    if(option==5) {
      deleteContacts();
    }
    if(option==6) {
      saveAndExit();
      break;
    }
  }
}

function main() {
  loadData();
  menu();
}

main();

