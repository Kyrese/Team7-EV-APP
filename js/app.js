user ={
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
    let chargeProg = document.getElementById("chargeProg") ; //get charge progess element
    let chargeLbl = document.getElementById("chargeLbl"); // get charge lbl
    let carLbl = document.getElementById("carLbl");
    let warningLbl = document.getElementById("warningLbl");
    console.table(user);

    //Display the relevant data in the UI elements that exist
    if(!chargeProg) return;
    chargeProg.value = user.vechileCharge.toString();
    if(!chargeLbl) return;
    chargeLbl.innerText = `${50}%`;
    if(!carLbl) return;
    carLbl.innerText = `${user.carModel}`;
    if(!warningLbl) return;
    user.batteryWarning = user.vechileCharge == 0 ? "Battery at 0!" : user.vechileCharge < 5 ? "Battery at 5 or less!" : user.vechileCharge < 10 ? "Battery is 10 or less!" : user.vechileCharge < 20 ? "Battery is 20 or less!" : user.vechileCharge < 50 ? "Battery is 50 or less!" : "No warning currently";
    warningLbl.innerText = user.batteryWarning;
}

