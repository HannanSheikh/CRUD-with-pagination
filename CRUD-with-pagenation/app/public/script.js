// document.getElementById('myform').onsubmit=(e)=>{
//     e.preventDefault();
//     var data = new URLSearchParams()
//     for(const pair of new FormData(e.target)){
//         data.append(pair[0],pair[1])
//     }
//     fetch('http://localhost:5000/sent',{
//         method:'post',
//         body:data
//     }).then(res=>res.json())
//     .then(res2=>console.log(res2));
// }
// const searchFunction = ()=>{
//     let filter = document.getElementById('myname').value.toUpperCase();
//     let table = document.getElementById('mytable');
//     let tr = table.document.getElementByTagName('tr');
//     for(var i = 0;i<tr.length;i++){
//         let td=tr[i].document.getElementByTagName('td')[0];
//         if(td){
//             let textvalue = td.textContent || td.innerHtml;

//             if(textvalue.toUpperCase().indexOf(filter) > -1){
//                 tr[i].style.display = "";
//             }else{
//                 tr[i].style.display = "none";
//             }
//         }
//     }
// }