const input = `1001796
37,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,457,x,x,x,x,x,x,x,x,x,x,x,x,13,17,x,x,x,x,x,x,x,x,23,x,x,x,x,x,29,x,431,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,19`;

const busSchedule = input.split("\n")[1].split(",");
const busIdsInService = busSchedule.filter(id => id !== "x").map(id => Number(id));
const indiciesWithBusIds = getIndicesWithBuses(busSchedule);

console.log(getTime());

function getTime() {
    console.log(`bus ids in service ${ busIdsInService }`);
    console.log(`indices with bus ids ${ indiciesWithBusIds }`);
    let time = 0;
    let step = busIdsInService[0];

    for (let i = 1; i < busIdsInService.length; i++) {
        let found = false;

        while (!found) {
            time += step;

            if ((time + indiciesWithBusIds[i]) % busIdsInService[i] === 0) {
                found = true;
                step *= busIdsInService[i];
            }
        }
    }

    return time;
}

function getIndicesWithBuses(busIdsOrX) {
    const indiciesWithBusIds = [];

    busIdsOrX.forEach((idOrX, i) => {
        if (idOrX !== "x") {
            indiciesWithBusIds.push(i);
        }
    });

    return indiciesWithBusIds;
}
