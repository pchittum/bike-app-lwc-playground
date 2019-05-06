function changeGearAsync(shiftObject){
    return new Promise(
        (resolve, reject)=>{
            const newIndex = shiftObject.currentIndex + shiftObject.changeBy; 

            if (newIndex < 0 || newIndex > shiftObject.maxIndex){
                reject("New Index is Invalid: " + newIndex);
            } else {
                resolve(newIndex);
            }
        });
}

// exporting a module
export { changeGearAsync };