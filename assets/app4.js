const butt = document.getElementById("ddbh");
const txt = document.getElementById("datepicker"); 
const from  =  document.getElementById("from"); 
const to = document.getElementById("to"); 

butt.addEventListener("click",function(){
 
    if(!(txt.value.length)){ 
    alert("please select the date of travel");
  } 
  else if((!(from.value.length)) || (!(to.value.length))){ 
      alert("please fill all the fields");
  } 
  else{ 
      
  }


  }
    
);

let suggestions =     ["Mumbai",
"Kolkata",
"Delhi",
"Chennai",
"Bangalore",
"Hyderabad",
"Ahmadabad",
"Pune",
"Surat",
"Kanpur",
"Jaipur",
"Lucknow",
"Nagpur",
"Patna",
"Indore",
"Vadodara",
"Bhopal",
"Coimbatore",
"Ludhiana",
"Kochi",
"Visakhapatnam",
"Agra",
"Varanasi",
"Madurai",
"Meerut",
"Nashik",
"Jabalpur",
"Jamshedpur",
"Asansol",
"Dhanbad",
"Faridabad",
"Allahabad",
"Amritsar",
"Vijayawada",
"Rajkot"
];


let suggestions1 =     ["Mumbai",
"Kolkata",
"Delhi",
"Chennai",
"Bangalore",
"Hyderabad",
"Ahmadabad",
"Pune",
"Surat",
"Kanpur",
"Jaipur",
"Lucknow",
"Nagpur",
"Patna",
"Indore",
"Vadodara",
"Bhopal",
"Coimbatore",
"Ludhiana",
"Kochi",
"Visakhapatnam",
"Agra",
"Varanasi",
"Madurai",
"Meerut",
"Nashik",
"Jabalpur",
"Jamshedpur",
"Asansol",
"Dhanbad",
"Faridabad",
"Allahabad",
"Amritsar",
"Vijayawada",
"Rajkot"
];

// getting all required elements
const searchWrapper = document.querySelectorAll(".search-input")[0];
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;

// if user press any key and release
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if(userData){
        icon.onclick = ()=>{
            webLink = `https://www.google.com/search?q=${userData}`;
            linkTag.setAttribute("href", webLink);
            linkTag.click();
        }
        emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}

function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = ()=>{
        webLink = `https://www.google.com/search?q=${selectData}`;
        linkTag.setAttribute("href", webLink);
        linkTag.click();
    }
    searchWrapper.classList.remove("active");
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData; 
    searchWrapper.value = listData;
    
}

const searchWrapper1 = document.querySelectorAll(".search-input")[1];
const inputBox1 = searchWrapper1.querySelector("input");
const suggBox1 = searchWrapper1.querySelector(".autocom-box");
const icon1 = searchWrapper1.querySelector(".icon");
let linkTag1 = searchWrapper1.querySelector("a");
let webLink1;

// if user press any key and release
inputBox1.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if(userData){
        icon1.onclick = ()=>{
            webLink1 = `https://www.google.com/search?q=${userData}`;
            linkTag1.setAttribute("href", webLink1);
            linkTag1.click();
        }
        emptyArray = suggestions1.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
        searchWrapper1.classList.add("active"); //show autocomplete box
        showSuggestions1(emptyArray);
        let allList = suggBox1.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select1(this)");
        }
    }else{
        searchWrapper1.classList.remove("active"); //hide autocomplete box
    }
}

function select1(element){
    let selectData = element.textContent;
    inputBox1.value = selectData;
    icon1.onclick = ()=>{
        webLink1 = `https://www.google.com/search?q=${selectData}`;
        linkTag1.setAttribute("href", webLink1);
        linkTag1.click();
    }
    searchWrapper1.classList.remove("active");
}

function showSuggestions1(list){
    let listData;
    if(!list.length){
        userValue = inputBox1.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox1.innerHTML = listData;
    searchWrapper1.value = listData;
}
