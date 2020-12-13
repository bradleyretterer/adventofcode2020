const input = `1001796
37,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,457,x,x,x,x,x,x,x,x,x,x,x,x,13,17,x,x,x,x,x,x,x,x,23,x,x,x,x,x,29,x,431,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,19`;

const [earliestDepartureTimestampString, busSchedule] = input.split("\n");
const earliestDepartureTimestamp = Number(earliestDepartureTimestampString);
const busIdsInService = busSchedule.split(",").filter(id => id !== "x").map(id => Number(id));

let earliestBusIdToTake = null;
let minutesToWaitForEarliestBus = Number.POSITIVE_INFINITY;

busIdsInService.forEach(busId => {
    const closestTimestampAfter = busId * Math.ceil(earliestDepartureTimestamp / busId);
    const minutesToWaitForBus = closestTimestampAfter - earliestDepartureTimestamp;

    if (minutesToWaitForBus < minutesToWaitForEarliestBus) {
        minutesToWaitForEarliestBus = minutesToWaitForBus;
        earliestBusIdToTake = busId;
    }
});

console.log(earliestBusIdToTake * minutesToWaitForEarliestBus);
