  <template>
    <div id="container">
      <div id="section-0">
        <div class="leaderboard-head">
          <h1 id="leaderboard-title"><span id="half-title">Recycle</span> Now Lah!</h1>
        </div>
      </div>

      <section class="section" id="section-1">
        <div class="info-section">
          <div class="row">
            <div class="col-12 col-md-6" v-for="card in infoCards" :key="card.id">
              <div class="card rounded-5">
                <img :src="card.image" class="card-img-top">
                <div class="card-body  rounded-bottom">
                  <h3 class="fw-bold">{{ card.title }}</h3>
                  <p>{{ card.text }}</p>
                  <button type="button" class="btn btn-primary fw-bold" :data-bs-target="card.modalTarget"
                    data-bs-toggle="modal">
                    {{ card.buttonText }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Modals -->
      <!-- Modal structure for Locate Bins -->
      <div class="modal fade" id="modalLocateBins" tabindex="-1" aria-labelledby="modalLocateBinsLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title fw-bold" id="modalLocateBinsLabel">Locate Recycling Bins</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
              <h3 class=" fw-bold">Find Recycling Bins Nearby</h3>

              <div class="container">
                <div class="row">
                  <div class="col-md-3">
                    <div>
                      <p>1. Input your current location and search</p>
                      <p>2. Blue marker will be your current location</p>
                      <p>3. Red markers will be recycling bins within 1km</p>
                      <p>4. Mouseover red markers to view walking route</p>
                      <p>5. Click your desired marker to start journey</p>
                    </div>
                  </div>
                  <div class="col-md-9">
                    <div id="map" style="width: 100%; height: 500px;"></div>
                  </div>
                </div>
                <div class="row g-0 mt-3">
                  <div class="col-md-12">
                    <input type="text" class="form-control" v-model="searchText" placeholder="Search your location" />
                  </div>
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <button class="btn btn-primary" @click="performSearch()">Search</button>
            </div>
          </div>
        </div>
      </div>


      <div class="modal fade" id="addImgModal" tabindex="-1" aria-labelledby="addImgModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered ">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5">Upload Item Image</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-center">

              <div class="upload-container" @click="triggerImageUpload">
                <!-- Only show this text if no image preview is available -->
                <p id="uploadText" v-if="!imagePreviewUrl">Click to select<br>JPG, PNG, BMP, or WEBP Only</p>

                <!-- Image preview, fills the container and hides the text when visible -->
                <img v-if="imagePreviewUrl" :src="imagePreviewUrl" alt="Image Preview" id="imagePreview" />
              </div>
              <input type="file" ref="fileInput" accept="image/*" style="display: none" @change="analyseImage" />

              <!-- Display loading spinner if loading is true -->
              <div style="margin-top: 10px ;" v-if="loading" class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>


              <p id="result" style="margin-top: 10px;">{{ resultMessage }}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="clearImage">Clear Image</button>
              <button type="button" class="btn btn-primary" @click="recycleNow()" :class="{ 'disabled': isTrue }">I want
                to recycle
                this!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer2 />


  </template>

<script>

const cs_key = import.meta.env.VITE_MAPS_API_KEY;
const nyckelClientId = import.meta.env.VITE_NYCKEL_CLIENT_ID;
const nyckelClientSecret = import.meta.env.VITE_NYCKEL_CLIENT_SECRET;
import MAP_JSON from './RecyclingBins.json';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../lib/auth'

import Footer2 from '../components/footer2.vue';

const { userName } = useAuth();
var currUser = userName;


export default {
  components: {
    Footer2
  },

  data() {
    return {
      username: currUser,
      map: null,
      isTrue: true,
      ifInsertSuccess: false,
      loading: false, // Loading state for the spinner
      recyclablesArr: ["Cloth", "Metal", "Plastic", "Paper", "Glass"],
      uploadedMaterial: undefined,
      nyckelKey: undefined,
      mapJson: MAP_JSON,
      recyclingBins: [],
      mapMarkers: [],
      searchLocationMarker: null,
      directionsService: null,
      directionsRenderer: null,
      searchText: '',
      imagePreviewUrl: null,
      resultMessage: 'Please upload an image of your item to ensure it is recyclable before you can submit and earn points',
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
          image: `/img/newspaper_bundle.jpg`,
          title: 'Recycling For Points!',
          text: 'Recycle right! Snap a picture and upload it here. If it is recyclable, you can recycle it and earn points!',
          buttonText: 'Add Image',
          modalTarget: '#addImgModal'
        }
      ]
    };
  },
  mounted() {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
    });
    this.loadGoogleMapsScript().then(() => {
      this.initMap();
    });
  },
  methods: {
    loadGoogleMapsScript() {
      return new Promise((resolve, reject) => {
        if (typeof google !== "undefined" && google.maps) {
          resolve();
        } else {
          const script = document.createElement("script");
          script.src = `https://maps.googleapis.com/maps/api/js?key=${cs_key}&libraries=geometry`;
          script.async = true;
          script.defer = true;
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        }
      });
    },
    initMap() {
      this.map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 1.3521, lng: 103.8198 },
        zoom: 13,
      });

      this.directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer({
        map: this.map,
        suppressMarkers: true,
        polylineOptions: { strokeColor: "#006400", strokeWeight: 6 },
      });


    },
    performSearch() {

      const geocoder = new google.maps.Geocoder();

      this.initMap();

      // Clear existing markers at the start of each new search
      this.clearMarkers();
      this.clearRoute();


      // Start a new search for the entered location
      geocoder.geocode({ address: this.searchText }, (results, status) => {
        if (status === 'OK') {
          const searchLocation = results[0].geometry.location;
          this.map.setCenter(searchLocation);

          // Clear the previous search location marker if it exists
          if (this.searchLocationMarker) this.searchLocationMarker.setMap(null);

          // Add new search location marker
          this.searchLocationMarker = new google.maps.Marker({
            position: searchLocation,
            map: this.map,
            title: 'Start Location',
            icon: { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }
          });

          const bounds = new google.maps.LatLngBounds();
          bounds.extend(searchLocation);

          // Iterate over recycling bins and add markers within 1km
          this.mapJson.features.forEach((feature) => {
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

              // Store the marker for clearing later
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
      // Remove all markers from the map
      this.mapMarkers.forEach((marker) => marker.setMap(null));
      this.mapMarkers = []; // Reset the marker array

      // Clear the search location marker as well
      if (this.searchLocationMarker) {
        this.searchLocationMarker.setMap(null);
        this.searchLocationMarker = null;
      }
    },

    triggerImageUpload() {
      this.$refs.fileInput.click();
    },

    clearImage() {
      this.imagePreviewUrl = null; // Clear the image preview
      this.resultMessage = 'Please upload an image of your item to ensure it is recyclable before you can submit and earn points';
      this.$refs.fileInput.value = ''; // Clear the file input
      this.isTrue = true; // Reset the button state if needed
    },

    getAccessToken() {

      fetch('https://www.nyckel.com/connect/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=client_credentials&client_id=${nyckelClientId}&client_secret=${nyckelClientSecret}`
      })
        .then(response => response.json())
        .then(data => {
          this.nyckelKey = data["access_token"];
        })
    },

    findWord(word, str) {
      return new RegExp(`\\(${word}\\)`).test(str);  // Check for the word inside parentheses
    },

    checkMaterial(input) {
      for (let material of this.recyclablesArr) {
        // Use a regular expression to match the exact word
        let regex = new RegExp(`\\b${material}\\b`, 'i');  // 'i' makes it case-insensitive
        if (regex.test(input)) {
          return material;
        }
      }
      return null;  // Return null if no match is found
    },

    async recycleNow() {

      const timeStamp = new Date().toISOString();
      var mat = this.uploadedMaterial.toLowerCase();

      const { data, error } = await supabase
        .from('UserActivitiesTable')
        .insert([
          { 'username': this.username, 'date_uploaded': timeStamp, 'recycled_material': mat },
        ])
        .select()
      this.isTrue = true;
      if (error) {
        console.log(error);
      } else {
        this.ifInsertSuccess = true;
      }

      if (this.ifInsertSuccess) {
        this.resultMessage = `Congratulations! You are on fire! Come back and recycle again!`;
      }

    },

    analyseImage(event) {
      const fileItem = event.target.files[0];
      if (fileItem) {
        this.imagePreviewUrl = URL.createObjectURL(fileItem);
        this.resultMessage = '';
      }

      let file = this.$refs.fileInput.files[0];
      let url = 'https://www.nyckel.com/v1/functions/recycling-identifier/invoke';
      this.getAccessToken();

      if (!file) {
        alert('Please select an image to upload');
        return;
      }

      this.loading = true;
      const form = new FormData();
      form.append('data', file);

      axios
        .post(
          url,
          form,
          {
            headers: {
              'Authorization': `Bearer ${this.nyckelKey}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        .then(response => {
          let obj = response.data;
          let output = obj.labelName
          let isRecyclable = this.findWord("Recyclable", output)
          this.uploadedMaterial = this.checkMaterial(output)

          if (isRecyclable) {
            this.resultMessage = `Your item is Recyclable! It is categorized as ${this.uploadedMaterial}. Would you like to recycle it?`
            this.isTrue = false

          } else {
            this.resultMessage = `Your item is not Recyclable! Do not recycle it!`
            this.isTrue = true
          }

        })
        .catch(error => {
          this.resultMessage = "Check failed"
        })
        .finally(() => {

          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
#container {
  width: 100%;
  height: 100vh;
  min-height: min-content;
  background-color: #FEFAE0;
  scroll-behavior: smooth;
  text-align: center;
}

#section-0 {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

#section-1 {
  min-height: min-content;
  background-color: #FEFAE0;
}

.section {
  height: 100vh;
  width: 100vw;
  scroll-snap-align: start;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}

.leaderboard-head {
  position: relative;
  height: 60vw;
  margin: 0;
  padding: 0;
  background: url(../assets/images/recycle-now-lah-header.jpg);
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

#half-title {
  color: #FEFAE0;
}

#leaderboard-title {
  animation: animated-cursor 750ms infinite;
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid;
  color: #798645;
  font-weight: bolder;
  font-size: 6vw;
  position: absolute;
  top: 30%;
  left: 25%;
  letter-spacing: -2px;
}

@media (max-width: 768px) {


  #leaderboard-title {
    font-size: 8vw;
    top: 20%;
    left: 10%;
    text-align: center;
    width: 80%;
    /* Make the title wrap instead of using white-space: nowrap */
  }
}

@media (max-width: 576px) {
  #leaderboard-title {
    font-size: 10vw;
    top: 15%;
    left: 5%;
  }
}

@keyframes animated-cursor {
  from {
    border-right-color: rgba(0, 0, 0, 0.75);
  }

  to {
    border-right-color: transparent;
  }
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.9);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}


.info-section {
  padding: 50px 50px;
  text-align: center;
}

.info-card {
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 30%;
  margin: 10px;
  text-align: center;

}

/* Ensure all cards have the same height */
.card {
  height: 100%;
  /* Allows consistent height within each column */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-img-top {
  height: 300px;
  /* Set a consistent height for all images */
  object-fit: cover;
  /* Ensures image fills the space without distortion */
  border-radius: 10px 10px 0 0;
}

.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #626F47;
  color: #FEFAE0;
}

.card h3,
.card p,
.card button {
  margin-top: auto;
  text-align: center;
}

.modal-content {
  background-color: #626F47;
  color: #FEFAE0;
}

.modal-dialog-centered {
  margin-top: 70px;
  /* Adjust based on navbar height */
}

/* Remove extra space below search button */
.modal .container .row:last-of-type {
  margin-bottom: 0;
}

.btn-primary {
  background-color: #F2EED7;
  color: #626F47;
  border: none;
}

.btn-primary:hover {
  background-color: #798645;
  color: #FEFAE0;
}

.card-img-top {
  border-radius: 10px 10px 0 0;
}

.upload-container {
  border: 2px dashed #FEFAE0;
  border-radius: 10px;
  padding: 0;
  position: relative;
  cursor: pointer;
  margin: auto;
  height: 450px;
  /* Adjust height as needed */
  width: auto;
  overflow: hidden;
  text-align: center;
}

.upload-container p {
  font-weight: bold;
  color: #FEFAE0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

#imagePreview {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 10px;
}
</style>
