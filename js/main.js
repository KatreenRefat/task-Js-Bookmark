var NameInput =document.getElementById("name");
var UrlInput =document.getElementById("URL");
var addBtn =document.getElementById("addBtn");
var tableBody=document.getElementById("tableBody");
var bookMarksList=[];


var regex={
    name:{
        value:/^[A-Za-z]{1,}$/,
        isValid:false
    },
    URL:{
      value:  /https?:\/\/w{0,3}\w*?\.(\w*?\.)?\w{2,3}\S*|www\.(\w*?\.)?\w*?\.\w{2,3}\S*|(\w*?\.)?\w*?\.\w{2,3}[\/\?]\S*/,
      isValid:false
    },
    
   }

if (localStorage.getItem('bookMarks')!==null){
    bookMarksList=JSON.parse(localStorage.getItem('bookMarks'));
    display();
}
function Add(){
    var bookMark ={
        SiteName:NameInput.value,
        SiteURL:UrlInput.value,
    }
    bookMarksList.push(bookMark);
    localStorage.setItem("bookMarks",JSON.stringify(bookMarksList));
    display();
    clearForm();
    addBtn.disabled=true
} 
 function clearForm() {
   NameInput.value=null;
    UrlInput.value=null;
 }

function display() {
    var marks =``;
    for(var i=0;i<bookMarksList.length;i++){
        marks+=`
                       <tr>
                        <td>${[i]} </td>
                         <td> ${bookMarksList[i].SiteName}  </td>
                        <td><a href="http://${bookMarksList[i].SiteURL}"><button class="btn btn-primary">Visit</button></a></td>
                        <td><button onclick="Delete(${i})" class="btn btn-info">Delete</button></td>
                       </tr>`
    }
    
    document.getElementById('tableBody').innerHTML=marks;
    
}
function Delete(deletIndex) {
    bookMarksList.splice(deletIndex,1);
    localStorage.setItem("bookMarks",JSON.stringify(bookMarksList));
    display();
}

function validateInputs(element) {
   if (regex[element.id].value.test(element.value)) {
    element.classList.add('is-valid')
    element.classList.remove('is-invalid')
    regex[element.id].isValid=true
    element.nextElementSibling.classList.add('d-none')
    
   }else{
    element.classList.add('is-invalid')
    element.classList.remove('in-valid')
    regex[element.id].isValid=false
    element.nextElementSibling.classList.remove('d-none')
   }
   toggleAddBtn();

}
function toggleAddBtn(){
    if(regex.name.isValid && regex.URL.isValid){
        addBtn.disabled=false
    }else{
        addBtn.disabled=true
    }
}
