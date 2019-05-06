import { LightningElement, track } from 'lwc';

// regular JS module import
import { changeGearAsync } from './bikeUtility';

// module and class syntax
// all LWC's export a default class that extends Lightning Element
export default class Bike extends LightningElement {

    // decorators. these modify the behavior of these props 
    // so that they become reactive: when data changes, the DOM rerenders
    @track frontGearIndex;
    @track rearGearIndex;

    //constructor required when extending another class
    // default param values
    constructor(frontIndex = 0, rearIndex = 0){
        // invoked to wire this up to the prototype chain of parent 
        super();
        this.transmission = {
            frontGearTeeth: [30,45],
            rearGearTeeth: [11,13,15,17,19,21,24,28,32,36]
        }

        this.frontGearIndex = frontIndex < this.transmission.frontGearTeeth.length ? frontIndex : 0; 
        this.rearGearIndex = rearIndex < this.transmission.rearGearTeeth.length ? rearIndex : 0;
    }

    handleShift(event){

        // reusing event handlers with data- attributes
        console.log(event.target.dataset.location);
        console.log(event.target.dataset.direction);

        // variable cannot be reassigned (objects still mutable)
        const increment = parseInt(event.target.dataset.direction);

        this.changeGear(event.target.dataset.location, increment);
    }

    // getters 
    get frontGearTeeth() {
        return this.transmission.frontGearTeeth;
    }

    get rearGearTeeth() {
        return this.transmission.rearGearTeeth;
    }

    get currentFrontGear() {
        return this.frontGearTeeth[this.frontGearIndex];
    }

    get currentRearGear() {
        return this.rearGearTeeth[this.rearGearIndex];
    }

    get currentGearRatio() {
        return this.calculateGearRatio();
    }

    calculateGearRatio(){
        return this.currentFrontGear / this.currentRearGear; 
    }

    changeGear(frontOrRear, changeBy){

                            // template literals are awesome
        const shiftIndexName = `${frontOrRear}GearIndex`,
              maxIndex = this.transmission[`${frontOrRear}GearTeeth`].length;

        const shiftObject = {
            currentIndex: this[shiftIndexName],
            maxIndex,
            changeBy
        }

        // promise invoked here
        changeGearAsync(shiftObject)
            .then(
                newIndex => {   // <<<<--- arrow function with single param
                    this[shiftIndexName] = newIndex;
                    console.log(this.calculateGearRatio()); 
                }
            )
            .catch(
                (err) => {console.log("Error: " + err);}
            );
    }

    changeBothGears(frontChange, rearChange) {

        const shiftFront = {
            currentIndex: this.frontGearIndex,
            maxIndex: this.transmission.frontGearTeeth.length - 1,
            changeBy: frontChange
        };

        const shiftRear = {
            currentIndex: this.rearGearIndex,
            maxIndex: this.transmission.rearGearTeeth.length - 1,
            changeBy: rearChange
        };

        // must look at alternate syntax with async/await + Promise.all
        changeGearAsync(shiftFront)
            .then(
                (newIndex) => {
                    this.frontGearIndex = newIndex;
                    console.log(this.calculateGearRatio());
                    return changeGearAsync(shiftRear);
                }
            )
            .then(
                (newIndex) => {
                this.rearGearIndex = newIndex;
                console.log(this.calculateGearRatio());
                }
            )
            .catch(
                 (err) => {console.log("Error: " + err);}
            );
        };

}

function _changeGearAsync(shiftObject){
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