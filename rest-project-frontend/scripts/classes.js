class DeliveryPackage {
    constructor(deliveryPackageId, tags, width, length, height, weight, lat, lng, createdTime, lastModifiedTime, version) {
        this.deliveryPackageId = deliveryPackageId;
        this.tags = tags;
        this.width = width;
        this.length = length;
        this.height = height;
        this.weight = weight;
        this.lat = lat;
        this.lng = lng;
        this.createdTime = createdTime;
        this.lastModifiedTime = lastModifiedTime;
        this.version = version;
    }
}

class CreatePackageRequest {
    constructor(tags, width, length, height, weight, lat, lng) {
        this.tags = tags;
        this.width = width;
        this.length = length;
        this.height = height;
        this.weight = weight;
        this.lat = lat;
        this.lng = lng;
    }
}

class UpdatePackageRequest {
    constructor(deliveryPackageId, newTags, width, length, height, weight, lat, lng, version) {
        this.deliveryPackageId = deliveryPackageId;
        this.newTags = newTags;
        this.width = width;
        this.length = length;
        this.height = height;
        this.weight = weight;
        this.lat = lat;
        this.lng = lng;
        this.version = version;
    }
}