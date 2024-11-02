<template>
  <div>
    <div class="banner">
      <img src="img/banner.png" alt="Banner Image" class="banner-img" />
      <div class="banner-text">
        <h1 class="display-3">Welcome to RecycleNow!</h1>
        <p class="lead">Your guide to smart recycling and sustainable living</p>
      </div>
    </div>

    <div class="info-section">
      <div class="row">
        <div class="col" v-for="card in infoCards" :key="card.id">
          <div class="card">
            <img :src="card.image" class="card-img-top" alt="Map Image" />
            <div class="card-body">
              <h3>{{ card.title }}</h3>
              <p>{{ card.text }}</p>
              <button
                type="button"
                class="btn btn-primary"
                :data-bs-target="card.modalTarget"
                data-bs-toggle="modal"
              >
                {{ card.buttonText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <div
      class="modal fade"
      id="modalLocateBins"
      tabindex="-1"
      aria-labelledby="modalLocateBinsLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalLocateBinsLabel">Locate Recycling Bins</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <h3>Find Recycling Bins Nearby</h3>
            <div class="container">
              <div class="row">
                <div class="col-3">
                  <label for="search-location" class="form-label">Location</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="searchText"
                    placeholder="Search your location"
                  />
                  <button class="btn btn-primary mt-2" @click="performSearch">Search</button>
                </div>
                <div class="col-9">
                  <div id="map" style="width: 100%; height: 500px;"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="addImgModal" tabindex="-1" aria-labelledby="addImgModal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="addImgModal">Upload Item Image</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center">
            <div class="upload-container" @click="triggerImageUpload">
              <p id="uploadText">Drop image or click to select<br>JPG, PNG, BMP, or WEBP</p>
              <img v-if="imagePreviewUrl" :src="imagePreviewUrl" alt="Image Preview" id="imagePreview" />
            </div>
            <input type="file" id="imageInput" accept="image/*" style="display: none" @change="previewImageModal" />
            <p id="result" style="margin-top: 10px;">{{ resultMessage }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn main-btns" @click="analyseImage">Check Recyclability</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const cs_key = import.meta.env.VITE_MAPS_API_KEY;
import MY_JSON from './RecyclingBins.json';

export default {
  data() {
    return {
      map: null,
      myJson: MY_JSON,
      recyclingBins: [],
      mapMarkers: [],
      searchLocationMarker: null,
      directionsService: null,
      directionsRenderer: null,
      searchText: '',
      imagePreviewUrl: null,
      resultMessage: 'Please upload an image of your item',
      infoCards: [
        {
          id: 1,
          image:
            `https://maps.googleapis.com/maps/api/staticmap?center=1.3521,103.8198&zoom=13&size=600x300&key=${cs_key}`,
          title: 'Recycle Where?',
          text: 'Find the nearest recycling bin in your area with ease.',
          buttonText: 'Locate Bins',
          modalTarget: '#modalLocateBins'
        },
        {
          id: 2,
          image: '',
          title: 'Get the GREENLIGHT!',
          text: 'Recycle right! Snap a picture and upload it here. If it is recyclable, you can recycle it and earn points!',
          buttonText: 'Add Image',
          modalTarget: '#addImgModal'
        }
      ]
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 1.3521, lng: 103.8198 },
        zoom: 13
      });

      this.directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer({
        map: this.map,
        suppressMarkers: true,
        polylineOptions: { strokeColor: '#006400', strokeWeight: 6 }
      });

      fetch('./RecyclingBins.json')
        .then((response) => response.json())
        .then((data) => {
          this.recyclingBins = data.features;
        })
        .catch((error) => console.error('Error loading GeoJSON data:', error));
    },
    performSearch() {
      const geocoder = new google.maps.Geocoder();

      geocoder.geocode({ address: this.searchText }, (results, status) => {
        if (status === 'OK') {
          const searchLocation = results[0].geometry.location;
          this.map.setCenter(searchLocation);
          this.clearMarkers();
          this.clearRoute();

          if (this.searchLocationMarker) this.searchLocationMarker.setMap(null);
          this.searchLocationMarker = new google.maps.Marker({
            position: searchLocation,
            map: this.map,
            title: 'Start Location',
            icon: { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }
          });

          const bounds = new google.maps.LatLngBounds();
          bounds.extend(searchLocation);

          this.recyclingBins.forEach((feature) => {
            const [lng, lat] = feature.geometry.coordinates;
            const binLocation = new google.maps.LatLng(lat, lng);

            if (google.maps.geometry.spherical.computeDistanceBetween(searchLocation, binLocation) <= 1000) {
              const marker = new google.maps.Marker({
                position: binLocation,
                map: this.map,
                title: feature.properties.name || 'Recycling Bin'
              });

              marker.addListener('mouseover', () => this.showWalkingRoute(searchLocation, binLocation));
              marker.addListener('mouseout', () => this.clearRoute());

              marker.addListener('click', () => {
                const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${searchLocation.lat()},${searchLocation.lng()}&destination=${lat},${lng}&travelmode=walking`;
                window.open(directionsUrl, '_blank');
              });

              this.mapMarkers.push(marker);
              bounds.extend(binLocation);
            }
          });

          this.map.fitBounds(bounds);
        } else {
          alert('Search was unsuccessful: ' + status);
        }
      });
    },
    showWalkingRoute(origin, destination) {
      this.directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.WALKING
        },
        (result, status) => {
          if (status === 'OK') this.directionsRenderer.setDirections(result);
          else console.error('Error getting directions:', status);
        }
      );
    },
    clearRoute() {
      this.directionsRenderer.setDirections({ routes: [] });
    },
    clearMarkers() {
      this.mapMarkers.forEach((marker) => marker.setMap(null));
      this.mapMarkers = [];
    },
    previewImageModal() {
      const file = this.$refs.imageInput.files[0];

      if (file) {
        this.imagePreviewUrl = URL.createObjectURL(file);
        this.resultMessage = '';
      }
    },
    triggerImageUpload() {
      this.$refs.imageInput.click();
    },
    async analyseImage() {
      const file = this.$refs.imageInput.files[0];
      const url = 'https://www.nyckel.com/v1/functions/recycling-image/analyze';
      const key = 'YOUR_NYCKEL_API_KEY';

      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post(url, formData, {
          headers: { Authorization: `Bearer ${key}` }
        });
        const result = response.data.labelName;
        this.resultMessage = result === 'Recyclable' ? 'Good news! It’s recyclable!' : 'Not recyclable. Please dispose of responsibly.';
      } catch (error) {
        console.error('Error analyzing image:', error);
        this.resultMessage = 'Image analysis failed. Please try again.';
      }
    }
  }
};
</script>

<style scoped>
/* Include relevant CSS here */
</style>
