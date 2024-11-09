  <template>
    <div class="container">
      <!-- <div class="body"> -->

      <div id="section-0">
        <div class="leaderboard-head">
          <h1 id="leaderboard-title"><span id="half-title">Recycle</span> Now Lah!</h1>
        </div>
      </div>


      <div class="info-section">
        <div class="row">
          <div class="col" v-for="card in infoCards" :key="card.id">
            <div class="card">
              <img :src="card.image" class="card-img-top">
              <div class="card-body">
                <h3>{{ card.title }}</h3>
                <p>{{ card.text }}</p>
                <button type="button" class="btn btn-primary" :data-bs-target="card.modalTarget" data-bs-toggle="modal">
                  {{ card.buttonText }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


      <!-- </div> -->
    </div>




    <!-- Modals -->
    <div class="modal fade" id="modalLocateBins" tabindex="-1" aria-labelledby="modalLocateBinsLabel"
      aria-hidden="true">
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
                  <div>
                    1. Input your current location and search
                    <br>
                    <br>
                    2. Blue marker will be your current location
                    <br>
                    <br>
                    3. Red markers will be the recycling bins that are within 1km from you
                    <br>
                    <br>
                    4. Mouseover the red markers to have a look at the walking route!
                    <br>
                    <br>
                    5. Click on your desired marker to start journey
                    <br>
                    <br>
                  </div>
                </div>
                <div class="col-9">
                  <div id="map" style="width: 100%; height: 500px;"></div>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col">

                  <input type="text" class="form-control" v-model="searchText" placeholder="Search your location" />
                  <button class="btn btn-primary mt-2" @click="performSearch()">Search</button>
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
            <h1 class="modal-title fs-5">Upload Item Image</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center">

            <div class="upload-container" @click="triggerImageUpload">
              <!-- Only show this text if no image preview is available -->
              <p id="uploadText" v-if="!imagePreviewUrl">Drop image or click to select<br>JPG, PNG, BMP, or WEBP</p>

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
            <button type="button" class="btn btn-primary" @click="addPoints()" disabled>I want to recycle
              this!</button>
          </div>
        </div>
      </div>
    </div>

  </template>

<script>

const cs_key = import.meta.env.VITE_MAPS_API_KEY;
const nyckelClientId = import.meta.env.VITE_NYCKEL_CLIENT_ID;
const nyckelClientSecret = import.meta.env.VITE_NYCKEL_CLIENT_SECRET;
import MAP_JSON from './RecyclingBins.json';
import { useAuth } from '../lib/auth'

const { userName } = useAuth();
var currUser = userName;
console.log(userName);


export default {
  data() {
    return {
      map: null,
      loading: false, // Loading state for the spinner
      recyclablesArr: ["cloth", "metal", "plastic", "paper", "glass"],
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
          image: `./src/assets/images/newspaper_bundle.jpg`,
          title: 'Recycling For Points!',
          text: 'Recycle right! Snap a picture and upload it here. If it is recyclable, you can recycle it and earn points!',
          buttonText: 'Add Image',
          modalTarget: '#addImgModal'
        }
      ]
    };
  },
  mounted() {
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

    triggerImageUpload() {
      this.$refs.fileInput.click();
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
          console.log(obj);
          let firstDashIndex = obj.labelName.indexOf("-");

          // Extract the category and item name
          let outputCategory = obj.labelName.substring(0, firstDashIndex).trim();
          outputCategory = outputCategory.charAt(0).toLowerCase() + outputCategory.slice(1);
          outputCategory = outputCategory.replace(/\s*\(Recyclable\)$/, "").trim();


          if (!this.recyclablesArr.includes(outputCategory)) {
            this.resultMessage = `Your item is categorized as ${outputCategory}. This item is NOT recyclable!`
          } else {
            this.resultMessage = `Your item is categorized as ${outputCategory}. It is recyclable! Will you like to recycle it and earn points?`
          }
        })
        .catch(error => {
          console.log(error.message);
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
.container {
  width: 100%;
  height: 100vh;
  max-width: 100vw;
  /* overflow-y: scroll; */
  scroll-behavior: smooth;
  margin: 0;
  padding: 0;
  text-align: center;
}
#section-0{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
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
  /* background-color: #626F47; */
  position: relative;
  height: 100vh;
  width: 100vw;
  margin: 0px;
  padding: 0px;
  background: url(../assets/images/recycle-now-lah-header.jpg);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;

}

#half-title {
  color: white;
}

#leaderboard-title {
  animation: animated-text 2s steps(11, end) 0.5s 1 normal both,
    animated-cursor 750ms steps(11, end) infinite;
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid;
  /* Creates the cursor */
  color: #798645;
  font-weight: bolder;
  margin-left: 100px;
  font-size: 6vw;
  position: absolute;
  top: 30%;
  left: 25%;
  letter-spacing: -2px;
}

@keyframes animated-cursor {
    from {
        border-right-color: rgba(0, 0, 0, 0.75);
    }

    to {
        border-right-color: transparent;
    }
}

@keyframes animated-text {
    from {
        width: 0%;
    }

    to {
        width: 700px;
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

/* .template {
  height: 100vh;
  overflow: hidden;
} 

.body {
  background-color: #FEFAE0;
  color: #333;
  width: 100vw;
  height: 100vh;
  perspective: 1px;
  transform-style: preserve-3d;
  overflow-x: hidden;
  overflow-y: scroll;
}

.section1::before {
  content: "";
  width: 100vw;
  height: 100lvh;
  position: absolute;
  background: url("../../public/img/plastic_bottles.jpg") top center;
  background-size: cover;
  transform: translateZ(-1px) scale(2.5);
  filter: blur(2px);
  z-index: 1;
}


.section1,
.section2 {
  width: 100%;
  min-height: 100vh;
  position: relative;
  transform-style: preserve-3d;

}
.section1 .text {
  top: 10%;
  transform: translateZ(-0.5px) scale(1.5,1.6) translate(-33%, 10%);
}


.section1 .sub-text {
  top: 10%;
  transform: translateZ(-0.5px) scale(1.5,1.6) translate(-33%, 10%);
}
.text {
  left: 50%;
  top: 30%;
  position: absolute;
  font-size: 10vw;
  text-align: center;
  font-family: 'Franklin Gothic Heavy';
  color: white;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3),
    5px 5px 70px rgba(255, 255, 255, 0.5);
  transform: scale(1, 1.1) translate(-50%, 10%);
}

.sub-text {
  top: 30%;
  left: 50%;
  position: absolute;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  font-size: 3vw;
  color: white;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3),
    5px 5px 70px rgba(255, 255, 255, 0.5);
  transform: scale(1, 1.1) translate(-50%, 10%);
} */


.info-section {
  padding: 50px 20px;
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
}

.card h3,
.card p,
.card button {
  margin-top: auto;
  text-align: center;
}



.btn-primary {
  background-color: #626F47;
  border: none;
}

.btn-primary:hover {
  background-color: #798645;
}

.card-img-top {
  border-radius: 10px 10px 0 0;
}

.upload-container {
  border: 2px dashed #798645;
  border-radius: 10px;
  padding: 0;
  position: relative;
  color: #798645;
  cursor: pointer;
  margin: auto;
  height: 450px;
  /* Adjust height as needed */
  width: 450px;
  overflow: hidden;
  text-align: center;
}

.upload-container p {
  font-weight: bold;
  color: #798645;
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
