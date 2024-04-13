user = {
    email:"boop@boop.com",
    password:"1234",
    userPoints:1234,
    vehicleID: 1234,
    vechileCharge: 61,
    batteryWarning: "TBD",
    carModel: "Leaf",
    mileage: 1234
}
function DisplayVehicle() {

    user = JSON.parse(sessionStorage.getItem("user"));

    if(!user) window.location.replace("sign_up.html");
    let chargeProg = document.getElementById("chargeProg"); //get charge progess element
    let chargeLbl = document.getElementById("chargeLbl"); // get charge lbl
    let carLbl = document.getElementById("carLbl");
    let warningLbl = document.getElementById("warningLbl");
    console.table(user);

    //Display the relevant data in the UI elements that exist
    if(!chargeProg) return;
    chargeProg.value = user.vechileCharge.toString();
    if(!chargeLbl) return;
    chargeLbl.innerText = `${user.vechileCharge}%`;
    if(!carLbl) return;
    carLbl.innerText = `${user.carModel}`;
    if(!warningLbl) return;
    user.batteryWarning = user.vechileCharge == 0 ? "Battery at 0!" : user.vechileCharge < 5 ? "Battery at 5 or less!" : user.vechileCharge < 10 ? "Battery is 10 or less!" : user.vechileCharge < 20 ? "Battery is 20 or less!" : user.vechileCharge < 50 ? "Battery is 50 or less!" : "No warning currently";
    warningLbl.innerText = user.batteryWarning;
}

function DisplayRebatePoints(){
    user = JSON.parse(sessionStorage.getItem("user"));

    if(!user) window.location.replace("sign_up.html");

    //get dom elements
    let pointLbl = document.getElementById("pointsLbl");

    pointLbl.innerText = user.userPoints;
}

function redeemPoints(){
    let transaction = db.transaction("users", "readwrite");
    transaction.oncomplete = (event) => {
        alert("Points redeemed");
    }
    transaction.onerror = (event) => {
        console.error(`kyrese is crying because ${event.target.errorCode}`, event.target.error);
    };
    
    const req = transaction.objectStore("users").get(user.email);

    req.onsuccess = (event) => {
        res = event.target.result
        if(!res){
            alert("Invalid User");
            return;
        }
        
        res.userPoints = 0;
        DisplayRebatePoints();
        sessionStorage.setItem("user", JSON.stringify(res)); // Update session data
        transaction.objectStore("users").put(res); //Update user data
    };

    req.onerror = (event) => {
        console.error(`kyrese is crying because ${event.target.errorCode}`, event.target.error);
    };
}

// DATABASE
const dbName = "Team7-db";
const DBOpenRequest = window.indexedDB.open(dbName, 1);

let transaction;
//Error Handling
DBOpenRequest.onerror = (event) => {
    console.error(`kyrese is crying because ${event.target.errorCode}`,event.target.error);
};
DBOpenRequest.onsuccess= (event) => {
    db = event.target.result;
}

// This event is only implemented in recent browsers
DBOpenRequest.onupgradeneeded = (event) => {
    // Save the IDBDatabase interface
    const db = event.target.result;
  
    // Create an objectStore for this database
    const objectStore = db.createObjectStore("users", { keyPath: "email" });

    // Create an index to search customers by name. We may have duplicates
    // so we can't use a unique index.
    objectStore.createIndex("password", "password", { unique: false });

    // Create an index to search customers by email. We want to ensure that
    // no two customers have the same email, so use a unique index.
    objectStore.createIndex("email", "email", { unique: true });
};
function LogIn(){
    //get DOM elements
    const emailTxT = document.getElementById("log-in-email");
    const psswdTxt = document.getElementById("log-in-password");

    let transaction = db.transaction("users", "readwrite");
    transaction.onerror = (event) => {
        console.error(`Kyrese is crying because ${event.target.errorCode}`, event.target.error);
    };
    
    const req = transaction.objectStore("users").get(emailTxT.value);

    req.onsuccess = (event) => {
        res = event.target.result
        if(!res){
            alert("Invalid User");
            return;
        }
        
        if(psswdTxt.value == res.password)
        {
            alert("Successful Log In");
            sessionStorage.setItem("user", JSON.stringify(res));
            window.location.replace("index.html");
        }
        else{
            alert ("Incorrect credentials");
        }
    };

    req.onerror = (event) => {
        console.error(`kyrese is crying because ${event.target.errorCode}`, event.target.error);
    };
    
    
}
function SignUp(){
    //get DOM elements
    const emailTxT = document.getElementById("sign-up-email");
    const psswdTxt = document.getElementById("vechicleIdTXT");
    const vecIDTxt = document.getElementById("sign-up-password");

    user = {
        email: emailTxT.value,
        password: psswdTxt.value,
        userPoints: 40,
        vehicleID: vecIDTxt.value,
        vechileCharge: 100,
        batteryWarning: "TBD",
        carModel: vecIDTxt.value,
        mileage: 0
    }

    let transaction = db.transaction("users", "readwrite");

    transaction.oncomplete = (event) => {
        console.log("All done!");
    };
    transaction.onerror = (event) => {
        console.error(`kyrese is crying because ${event.target.errorCode}`);
    };

    let request = transaction.objectStore("users").add(user);

    request.onsuccess = (event) => {
        alert("Successful Log In");
        sessionStorage.setItem("user", JSON.stringify(user));
        window.location.replace("index.html");
    }
}
