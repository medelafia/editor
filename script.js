let filterBtns = document.querySelectorAll(".filter-btns button"); 
let ourRange = document.querySelector(".range input "); 
let filterStatus = document.querySelectorAll(".values p");
let fileInput = document.querySelector(".file-input"), 
fileChooser = document.querySelector(".chooser "); 
let display = document.getElementById("display");
let flip = document.getElementById("flip_hor");
let filterName = "brightness"; 
let brightness = "100%" , grayscale = "0%",contrast = "100%",blure = "0px";
let resetBtn = document.getElementById("reset");
let rotateRight = document.getElementById("right_rotate");
let rotateLeft = document.getElementById("left_rotate");
let save = document.getElementById("save");
let draw = document.querySelector(".draw");
const loadImage = ()=>{
    let file = fileInput.files[0]; 
    if(!file) return; 
    display.src = URL.createObjectURL(file);
};
function unsialization(){
    ourRange.value = Number.parseFloat(brightness);
    filterStatus[1].innerHTML = brightness;
    display.style.filter = `brightness(100%) blur(0px) contrast(100%) grayscale(0%)`;
}
unsialization();
filterBtns.forEach((btn)=> {
    btn.addEventListener("click",()=> {
        filterBtns.forEach((button)=> {
            if(btn !== button){
                button.classList.remove("active");
            }
            else {
                button.classList.add("active");
            }
        }); 
        filterStatus[0].textContent = btn.innerHTML;
        switch(btn.innerHTML){
            case "brightness" : filterStatus[1].innerHTML = brightness ; 
                                ourRange.value = Number.parseInt(brightness);
                                break; 
            case "blur" :       filterStatus[1].innerHTML = blure ; 
                                ourRange.value = Number.parseInt(blure);
                                break; 
            case "grayscale" : filterStatus[1].innerHTML =  grayscale; 
                                ourRange.value = Number.parseInt(grayscale);
                                break; 
            case "contrast" :   filterStatus[1].innerHTML = contrast ; 
                                ourRange.value = Number.parseInt(contrast);
                                break; 
        }
        filterName = btn.innerHTML; 
    })
}
)
ourRange.addEventListener("input",()=> {
    if(!filterName === "blur"){
        filterStatus[1].innerHTML = `${ourRange.value}%`; 
    }else {
        filterStatus[1].innerHTML = `${ourRange.value}px`;
    }
    
    switch(filterName){
        case "brightness":  brightness = `${ourRange.value}%`;
                            display.style.filter = `brightness(${Number.parseInt(brightness)}%) blur(${Number.parseInt(blure)}px) contrast(${Number.parseInt(contrast)}%) grayscale(${Number.parseInt(grayscale)}%)`;
                            break ; 
        case "grayscale" :  grayscale = `${ourRange.value}%`;
                            display.style.filter = `grayscale(${Number.parseInt(grayscale)}%) blur(${Number.parseInt(blure)}px) contrast(${Number.parseInt(contrast)}%) brightness(${Number.parseInt(brightness)}%)`;
                            break ; 
        case "contrast" :   contrast = `${ourRange.value}%`;
                            display.style.filter = `contrast(${Number.parseInt(contrast)}%) blur(${Number.parseInt(blure)}px) brightness(${Number.parseInt(brightness)}%) grayscale(${grayscale})`;   
                            break ; 
        case "blur" :       blure = `${ourRange.value}px`;
                            display.style.filter = `blur(${Number.parseInt(blure)}px) brightness(${Number.parseInt(brightness)}%) contrast(${Number.parseInt(contrast)}%) grayscale(${Number.parseInt(grayscale)}%)`;    
                            break ; 
    }
}); 
 
fileChooser.addEventListener("click",()=>fileInput.click());
fileInput.addEventListener("change",loadImage); 
resetBtn.addEventListener("click",()=> {
    display.style.filter = `brightness(100%) blur(0px) contrast(100%) grayscale(0%)`;
}); 
rotateRight.addEventListener("click",()=> {
    display.style.transform += "rotate(90deg)";
}); 
rotateLeft.addEventListener("click",()=> {
    display.style.transform += "rotate(-90deg)";
}); 
flip.addEventListener("click",()=> {
    display.style.transform += "rotate(180deg)";
}); 
save.addEventListener("click",()=> {
    const canvas = document.createElement("canvas"); 
    let cts = canvas.getContext("2d"); 
    canvas.width = display.naturalWidth; 
    canvas.height = display.naturalHeight;

    cts.drawImage(display,0,0,canvas.width , canvas.height);
    canvas.style.filter = `brightness(${Number.parseInt(brightness)}%) blur(${Number.parseInt(blure)}px) contrast(${Number.parseInt(contrast)}%) grayscale(${Number.parseInt(grayscale)}%)`;
    let link = document.createElement("a"); 
    document.body.append(link);
    link.download = "image.jpg"; 
    link.href  = canvas.toDataURL();
    link.click();
    document.body.remove(link);
});

