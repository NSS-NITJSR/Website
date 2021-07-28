var firebaseConfig = {
  apiKey: "AIzaSyARhTw65R4uZzk2KOzOF8KhCXAr6_9pYW8",
  authDomain: "nssnitjsr-3fd61.firebaseapp.com",
  databaseURL: "https://nssnitjsr-3fd61.firebaseio.com/",
  projectId: "nssnitjsr-3fd61",
  storageBucket: "nssnitjsr-3fd61.appspot.com",
  messagingSenderId: "535015158824",
  appId: "1:535015158824:web:a6941438d7de794e46b11d",
  measurementId: "G-DM902X771F"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

var database = firebase.database();

var certiref_public = firebase.database().ref('certificates');

//For Team Use
var certiref_private = firebase.database().ref('TeamData/certificates');

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  var certno = getInputVal('textinput0');
  var name = getInputVal('textinput1');
  var regno = getInputVal('textinput2');
  var op = getInputVal('selectbasic');
  var branch = "";
  if (op == '1') branch = "Civil Engineering";
  else if (op == '2') branch = "Computer Science Engineering";
  else if (op == '3') branch = "Electronics and Communication Engineering";
  else if (op == '4') branch = "Electrical Engineering";
  else if (op == '5') branch = "Mechanical Engineering";
  else if (op == '6') branch = "Metallurgy and Material Science Engineering";
  else if (op == '7') branch = "Production Engineering";
  else if (op == '8') branch = "Master of Computer Applications";
  else if (op == '9') branch = "M.Sc.";
  var email = getInputVal('textinput3');
  var contact = getInputVal('textinput4');


  if (certno != "" && name != "" && regno != "" && branch != "" && email != "" && contact != "")
    saveMessage(certno, name, regno, branch, email, contact);
  else
    alert("please Fill All Fields")
}

function getInputVal(id) {
  return document.getElementById(id).value;

}


function saveMessage(certno, name, regno, branch, email, contact) {
  var child = certno.replace(/\//g, "").toLowerCase();
  var date = getCurrentDate();

  // For Verification purpose
  var newcertiRef = certiref_public.child(child);
  newcertiRef.set({
    certno: certno,
    name: name,
    regno: regno,
    branch: branch,
    date: date
  })

  //For Team use 
  var newcertiRef2 = certiref_private.child(child);
  newcertiRef2.set({
    certno: certno,
    name: name,
    regno: regno,
    branch: branch,
    email: email,
    contact: contact,
    date: date
  })


  document.querySelector('.alert').style.display = 'block';
  setTimeout(function () {
    document.querySelector('.alert').style.display = 'none';
    document.getElementById("contactForm").reset();

  }, 3000);
}



function save_notification() {
  var notice = $("#notice_data").val();
  var date = getCurrentDate();
  firebase.database().ref('notification/Notice').set({
    notice: notice,
    date: date
  })
  document.querySelector('.alert').style.display = 'block';
  setTimeout(function () {
    document.querySelector('.alert').style.display = 'none';
    $("#notice_data").val("");

  }, 3000);
}


function loadNews() {
  firebase.database().ref('notification/Notice').once('value')
    .then(function (snapshot) {
      var value = snapshot.val();
      if (value != null) {
        $("#latest_news").text(value.notice);
        $("#latest_news").prop('title', `Updated on ${value.date}`);
      } else {

      }
    })
}

function checkCertificate() {
  $("#response").empty();
  var certiNumber = $("#certi_number").val();
  if (certiNumber != "") {
    var child = certiNumber.replace(/\//g, "").toLowerCase();
    certiref_public.child(`${child}`)
      .once('value')
      .then(function (snapshot) {
        var value = snapshot.val();
        if (value != null) {
          $("#response").append(`<div id='success_certi' class='modal fade'>
        <div class='modal-dialog modal-confirm'>
          <div class='modal-content'>
            <div class='modal-header'>
              <div class='icon-box mx-auto'>
                <i class='material-icons'>&#xE876;</i>
              </div>
              <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
            </div>
            <div class='modal-body text-center'>
              <h4>Verified!</h4>
              <p>This Certificate has been issued to <b id='name_of_person'></b> of branch <b id='branch_of_person'></b>
                bearing registration number <b id='regno_of_person'></b> on <b id='date_of_issue'></b></p>
              <button class='btn btn-success' data-dismiss='modal'><span>Close</span></button>
            </div>
          </div>
        </div>
      </div>
    `)
          $("#name_of_person").text(value.name);
          $("#branch_of_person").text(value.branch);
          $("#regno_of_person").text(value.regno);
          $("#date_of_issue").text(value.date);
          $("#success_certi").modal('show');
        } else {
          $("#response").append(`<div class='modal fade' id='failed_certi' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div class='modal-dialog modal-confirm'>
            <div class='modal-content'>
              <div class='modal-header bg-danger'>
                <div class='icon-box mx-auto'>
                  <i class='material-icons'>&#xE5CD;</i>
                </div>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
              </div>
              <div class='modal-body text-center'>
                <h4>Failed!</h4>
                <p>Record Not Found</p>
                <button class='btn btn-success' data-dismiss='modal'><span>Close</span></button>
              </div>
            </div>
          </div>
      </div>
    `);
          $("#failed_certi").modal('show');
        }
      })
  } else {
    $("#response").append(`<div class='modal fade' id='failed_certi' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div class='modal-dialog modal-confirm'>
            <div class='modal-content'>
              <div class='modal-header bg-danger'>
                <div class='icon-box mx-auto'>
                  <i class='material-icons'>&#xE5CD;</i>
                </div>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
              </div>
              <div class='modal-body text-center'>
                <h4>Failed!</h4>
                <p>Please Enter Certificate Id</p>
                <button class='btn btn-success' data-dismiss='modal'><span>Close</span></button>
              </div>
            </div>
          </div>
      </div>
    `);
    $("#failed_certi").modal('show');
  }
}




function getCurrentDate() {
  date = new Date();
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {

    document.querySelector('.logoutview').style.display = 'none';
    document.querySelector('.loginview').style.display = 'block';
    var user = firebase.auth().currentUser;

    if (user) {
      var username = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + username;

    } else {

    }
  } else {
    document.querySelector('.loginview').style.display = 'none';
    document.querySelector('.logoutview').style.display = 'block';

  }
});



function login() {

  var userid = document.getElementById("email").value;
  var password = document.getElementById("pass").value;
  firebase.auth().signInWithEmailAndPassword(userid, password).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error : " + errorMessage);
  });

}

function logout() {
  firebase.auth().signOut().then(function () {}).catch(function (error) {});
}