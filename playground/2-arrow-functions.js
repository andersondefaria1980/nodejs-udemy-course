// const square = function (x) {
//  return x * x   
// }

// const square = (x) => { 
//     return x * x 
// }

//const square = (x) => x * x

//console.log(square(4))

const event = {
    name: 'Birthday Party',
    gestList: ['a','b','c','d'],
    printGestList() {
        console.log('Gest list for ' + this.name)
        this.gestList.forEach((gest) => console.log(gest + ' is atending ' + this.name))
        
    }
}

event.printGestList()