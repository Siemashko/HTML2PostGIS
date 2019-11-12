
async function findAll() {
    const responseJson = await fetch(restServiceUrl + "/package").then(response => response.json());
    return [...new Set(responseJson.map(deliveryPackage => Object.assign(new DeliveryPackage, deliveryPackage)))];
}

async function findByIds(ids) {
    const responseJson = await fetch(restServiceUrl + "/package?ids=" + ids).then(response => response.json());
    return [...new Set(responseJson.map(deliveryPackage => Object.assign(new DeliveryPackage, deliveryPackage)))];
}

async function createPackage(createPackageRequest) {
    const responseJson = await fetch(restServiceUrl + "/package",{method: "POST", body: JSON.stringify(createPackageRequest), headers: {'Content-type': 'application/json'}}).then(response => response.json());
    return Object.assign(new DeliveryPackage, responseJson);
}

async function updatePackage(updatePackageRequest) {
    const responseJson = await fetch(restServiceUrl + "/package",{method: "PUT", body: JSON.stringify(updatePackageRequest), headers: {'Content-type': 'application/json'}}).then(response => response.json());
    return Object.assign(new DeliveryPackage, responseJson);
}

async function deletePackage(id) {
    const response = await fetch(restServiceUrl + "/package/"+id, {method: "DELETE"});
    return response;
}

