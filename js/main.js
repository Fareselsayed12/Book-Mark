var inputBookMark =document.getElementById("bookName")
var inputSiteUrl =document.getElementById("siteUrl")
 var mesAlert=document.getElementById("alert")
 var closeB=document.getElementById("closeBtn")
var sitesList=[];
if(localStorage.getItem("sitesContainer")!==null){
    sitesList= JSON.parse(localStorage.getItem("sitesContainer"));
displaySites()
}
function addSite(){
if(
validationInputs(inputBookMark,'messageName')&&
validationInputs(inputSiteUrl,'messageUrl')
){
    var link ={
        Name : inputBookMark.value,
        Url  : inputSiteUrl.value,
}
if (sitesList.some(site => site.Name === link.Name || site.Url === link.Url)) {
  
    Swal.fire({
        icon: "error",
        title: "Duplicate Entry",
        text: "This site name or URL already exists.",
    });
    return;
}
else if(true){
    sitesList.push(link);
    localStorage.setItem("sitesContainer" ,JSON.stringify(sitesList))
    displaySites();
    clearForm();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your site has been saved",
      showConfirmButton: false,
      timer: 1500
    });
    }
}
else{
    mesAlert.classList.replace("d-none", "d-flex")
}
}
function clearForm(){
    inputBookMark.value=null;
    inputSiteUrl.value=null;
    inputBookMark.classList.remove("is-valid")
    inputSiteUrl.classList.remove("is-valid")
}
function displaySites(){
    var container="";
    for(var i =0 ; i<sitesList.length ;i++  ){
container+=`
  <tr class="">
                    <td scope="row">${i+1}</td>
                    <td>${sitesList[i].Name}</td>
                    <td><button class="btn btn-warning"> <i class="fa-solid fa-eye"></i><span class="ms-2"><a target="blank" class="link-dark text-decoration-none" href="${sitesList[i].Url}">visit</a>
</span></button></td>
                    <td><button onclick="alertDelete(${i})"  class="btn btn-danger"><i class="fa-solid fa-trash"></i><span class="ms-2">Delete</span></button></td>
                </tr>
`
    }
document.getElementById("tBody").innerHTML=container
}
function deleteSite(index){
    sitesList.splice(index,1)
    localStorage.setItem("sitesContainer" ,JSON.stringify(sitesList))
    displaySites()
}
function validationInputs(  element , msgId ){
    var text=element.value;
    var regex= {
        bookName:/^[a-zA-Z]{3,}$/,
        siteUrl:/^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:\/?#\[\]@!$&'()*+,;=%]*)?$/,
    }
    var message=document.getElementById(msgId)
    if(regex[element.id].test(text) ===true){
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        message.classList.add("d-none")
return true
}
else{
    element.classList.add("is-invalid")
element.classList.remove("is-valid")
message.classList.remove("d-none")
return false
}
}
function closeBtn(){
   mesAlert.classList.add("d-none")
}
document.addEventListener("click",function(e){
    if(e.target===mesAlert){
closeBtn()
    }
})

document.addEventListener("keydown",function(e){
    if(!mesAlert.classList.contains("d-none")){
     if(e.key==="Escape"){
      closeBtn()
    }
    }})
document.addEventListener("keydown", function(e){
if(e.key==="Enter"){
addSite()
}
})

    function alertDelete(index){
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
           confirmButtonText: "Yes, delete it!"
         
          }).then((result) => {
            if (result.isConfirmed) {
deleteSite(index)

              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success" ,
                
              });
            }
          });
    }
    