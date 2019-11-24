async function initializeApplication() {
    var count = 6;
    var lastCount = 0;
    if (!mymap) {
        mymap = L.map('mapid').setView([52.23, 21], 12);
        markerLayerGroup = L.layerGroup().addTo(mymap);
        polygonLayerGroup = L.layerGroup().addTo(mymap);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(mymap);
        mymap.on('click', onMapClick);
    }
    markerLayerGroup.clearLayers();
    polygonLayerGroup.clearLayers();
    document.getElementById("package-list").innerHTML = "";
    document.getElementById("job-list").innerHTML = "";
    var listOfDeliveryPackages = await findAll();
    listOfDeliveryPackages.forEach(package => addPackageToList(package));
    var listOfJobs = await findAllJobs();
    listOfJobs.forEach(job => addJobToList(job));
    var greenIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [50 * 0.707, 82 * 0.707],
        iconAnchor: [25 * 0.707, 82 * 0.707],
        popupAnchor: [1, -34],
        shadowSize: [82 * 0.707, 82 * 0.707]
    });
    L.marker([52.2, 21], { icon: greenIcon }).addTo(markerLayerGroup);

}

function addJobToList(job) {
    var jobList = document.getElementById("job-list");
    var listElement = document.createElement("li");
    listElement.id = "job-" + job.jobId;
    listElement.innerHTML = "Vehicle job: " + job.jobId + "<br/>Status: " + job.status;
    listElement.addEventListener("click", drawRoute);
    jobList.append(listElement);
    // var marker = L.marker([package.lat, package.lng]).addTo(markerLayerGroup);
    // marker.id = "marker-" + package.deliveryPackageId;
    // marker.on('click', showModalFromMarker);
}

async function drawRoute(e) {
    var jobId = Number(e.target.id.replace("job-", ""));
    var job = await findJobById(jobId);
    var route = [
        [52.2, 21]
    ];

    var polygon = L.polygon(route.concat([...job.jobResult.jobResultEntries.map(entry => [entry.lat, entry.lng])]), { fillOpacity: 0 }).addTo(polygonLayerGroup);
}

function addPackageToList(package) {
    var packageList = document.getElementById("package-list");
    var listElement = document.createElement("li");
    listElement.id = "package-" + package.deliveryPackageId;
    listElement.innerHTML = "Delivery Package: " + package.deliveryPackageId;
    listElement.addEventListener("click", showModalFromPackage);
    packageList.append(listElement);
    var marker = L.marker([package.lat, package.lng]).addTo(markerLayerGroup);
    marker.id = "marker-" + package.deliveryPackageId;
    marker.on('click', showModalFromMarker);
}

function showModal() {
    activeModaleDeliveryPackageId = null;
    document.getElementById("tags").value = "";
    document.getElementById("width").value = "";
    document.getElementById("height").value = "";
    document.getElementById("length").value = "";
    document.getElementById("weight").value = "";
    document.getElementById("lat").value = "";
    document.getElementById("lng").value = "";

    document.getElementById("modal-update-button").classList.add("hidden");
    document.getElementById("modal-delete-button").classList.add("hidden");
    document.getElementById("modal-submit-button").classList.remove("hidden");
    $("#myModal").modal("show");
}

function showVehicleModal() {
    document.getElementById("capacity").value = "";
    $("#myModal2").modal("show");
}

async function showModalFromPackage(e) {
    packageId = Number(e.target.id.replace("package-", ""));
    activeModaleDeliveryPackageId = packageId;
    deliveryPackages = await findByIds([packageId]);
    deliveryPackage = deliveryPackages[0];

    document.getElementById("tags").value = deliveryPackage.tags;
    document.getElementById("width").value = deliveryPackage.width;
    document.getElementById("height").value = deliveryPackage.height;
    document.getElementById("length").value = deliveryPackage.length;
    document.getElementById("weight").value = deliveryPackage.weight;
    document.getElementById("lat").value = deliveryPackage.lat;
    document.getElementById("lng").value = deliveryPackage.lng;

    document.getElementById("modal-update-button").classList.remove("hidden");
    document.getElementById("modal-delete-button").classList.remove("hidden");
    document.getElementById("modal-submit-button").classList.add("hidden");

    $("#myModal").modal("show");

}

async function showModalFromMarker(e) {
    packageId = Number(e.target.id.replace("marker-", ""));
    activeModaleDeliveryPackageId = packageId;

    deliveryPackages = await findByIds([packageId]);
    deliveryPackage = deliveryPackages[0];

    document.getElementById("tags").value = deliveryPackage.tags;
    document.getElementById("width").value = deliveryPackage.width;
    document.getElementById("height").value = deliveryPackage.height;
    document.getElementById("length").value = deliveryPackage.length;
    document.getElementById("weight").value = deliveryPackage.weight;
    document.getElementById("lat").value = deliveryPackage.lat;
    document.getElementById("lng").value = deliveryPackage.lng;

    document.getElementById("modal-update-button").classList.remove("hidden");
    document.getElementById("modal-delete-button").classList.remove("hidden");
    document.getElementById("modal-submit-button").classList.add("hidden");

    $("#myModal").modal("show");

}

async function sendCreateJobRequest(e) {
    var capacity = Number(document.getElementById("capacity").value);

    var createJobRequest = new CreateJobRequest(capacity);
    await createJob(createJobRequest);

    initializeApplication();
}

async function sendCreateDeliveryPackageRequest(e) {
    var tags = document.getElementById("tags").value.replace("[,;\s]*", " ").split(" ");
    var width = Number(document.getElementById("width").value);
    var height = Number(document.getElementById("height").value);
    var length = Number(document.getElementById("length").value);
    var weight = Number(document.getElementById("weight").value);
    var lat = Number(document.getElementById("lat").value);
    var lng = Number(document.getElementById("lng").value);

    var createPackageRequest = new CreatePackageRequest(tags, width, length, height, weight, lat, lng);

    await createPackage(createPackageRequest);

    initializeApplication();
}

async function sendUpdateDeliveryPackageRequest(e) {
    var tags = document.getElementById("tags").value.replace("[,;\s]*", " ").split(" ");
    var width = Number(document.getElementById("width").value);
    var height = Number(document.getElementById("height").value);
    var length = Number(document.getElementById("length").value);
    var weight = Number(document.getElementById("weight").value);
    var lat = Number(document.getElementById("lat").value);
    var lng = Number(document.getElementById("lng").value);

    deliveryPackages = await findByIds([activeModaleDeliveryPackageId]);
    deliveryPackage = deliveryPackages[0];

    var updatePackageRequest = new UpdatePackageRequest(activeModaleDeliveryPackageId, tags, width, length, height, weight, lat, lng, deliveryPackage.version);

    await updatePackage(updatePackageRequest);

    initializeApplication();
}

async function sendDeleteDeliveryPackageRequest(e) {
    await deletePackage(activeModaleDeliveryPackageId);

    initializeApplication();
}

function onMapClick(e) {
    showModal();
    console.log(e.latlng);
    document.getElementById("lat").value = e.latlng.lat.toFixed(4);
    document.getElementById("lng").value = e.latlng.lng.toFixed(4);
}
document.addEventListener("DOMContentLoaded", initializeApplication)