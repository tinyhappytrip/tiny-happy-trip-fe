<template>
  <div id="app">
    <header>
      <div class="profile-header">
        <img src="https://via.placeholder.com/150" alt="Profile" class="profile-image" />
        <div class="profile-info">
          <h1>Traveler Tales</h1>
          <p>San Francisco, CA</p>
          <div class="profile-stats">
            <span>30 Followers</span> | <span>100 Following</span> |
            <span>50 Playlists</span>
          </div>
        </div>
      </div>
    </header>
    <main>
      <aside>
        <button @click="savePlaylist">Save playlist</button>
        <button @click="sharePlaylist">Share playlist</button>
        <button @click="flagContent">Flag content</button>
        <button @click="recommendToFriend">Recommend to friend</button>
        <div class="playlist-achievements">
          <h2>Playlist Achievements</h2>
          <ul>
            <li>🍔 Foodie Anthems<br /><small>Explored < 10 culinary playlists!</small></li>
            <li>🌎 Taste Explorer<br /><small>Discovered 5 local music scenes</small></li>
            <li>✈️ Music Voyager<br /><small>Explored playlists in 20 countries</small></li>
          </ul>
        </div>
        <div class="overall-satisfaction">
          <h2>Overall satisfaction</h2>
          <ul>
            <li>⭐️⭐️⭐️⭐️⭐️</li>
            <li>⭐️⭐️⭐️⭐️</li>
            <li>⭐️⭐️⭐️</li>
            <li>⭐️⭐️</li>
            <li>⭐️</li>
          </ul>
        </div>
      </aside>
      <section class="playlist-collection">
        <div class="filter">
          <input type="text" v-model="searchQuery" placeholder="Search playlist" />
        </div>
        <div class="playlist-card" v-for="playlist in filteredPlaylists" :key="playlist.id">
          <img :src="playlist.image" alt="Playlist cover" />
          <div class="playlist-details">
            <h3>{{ playlist.title }}</h3>
            <div class="rating">
              <span v-for="star in playlist.rating" :key="star">⭐️</span>
            </div>
            <p>{{ playlist.description }}</p>
            <div class="playlist-images">
              <img v-for="image in playlist.images" :src="image" :alt="playlist.title" :key="image" />
            </div>
            <div class="likes-dislikes">
              <span>{{ playlist.likes }} Likes</span>
              <span>{{ playlist.dislikes }} Dislikes</span>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer>
      <button @click="exploreMorePlaylists">Explore more playlists</button>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const playlists = ref([
  {
    id: 1,
    title: 'Mountain Melodies',
    rating: 5,
    description: "Soothing tunes for a scenic journey. Enjoy peaceful music amidst nature's beauty.",
    image: 'https://via.placeholder.com/300',
    images: ['https://via.placeholder.com/100', 'https://via.placeholder.com/100'],
    likes: 25,
    dislikes: 2
  },
  {
    id: 2,
    title: 'Travel Beats',
    rating: 4,
    description: 'Energetic tunes, relaxing vibes. "My travel playlist is a game-changer. Docking one globe for subpar recommendations."',
    image: 'https://via.placeholder.com/300',
    images: ['https://via.placeholder.com/100', 'https://via.placeholder.com/100'],
    likes: 45,
    dislikes: 8
  },
  {
    id: 3,
    title: 'City Grooves',
    rating: 4,
    description: 'Vibrant city soundscape. "This playlist set the mood. The beats were on point and took me on a journey through the city lights."',
    image: 'https://via.placeholder.com/300',
    images: ['https://via.placeholder.com/100', 'https://via.placeholder.com/100'],
    likes: 112,
    dislikes: 5
  },
  {
    id: 4,
    title: 'Wanderlust Melodies',
    rating: 3,
    description: 'This playlist is music to my ears! "You can\'t beat the rhythm of these tunes."',
    image: 'https://via.placeholder.com/300',
    images: ['https://via.placeholder.com/100'],
    likes: 19,
    dislikes: 2
  }
])

const searchQuery = ref('')

const filteredPlaylists = computed(() => {
  return playlists.value.filter((playlist) => playlist.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
})

const savePlaylist = () => alert('Playlist saved!')
const sharePlaylist = () => alert('Playlist shared!')
const flagContent = () => alert('Content flagged!')
const recommendToFriend = () => alert('Recommended to friend!')
const exploreMorePlaylists = () => alert('Exploring more playlists!')
</script>

<style scoped>
header {
  display: flex;
  justify-content: center;
  padding: 20px;
  background: #f5f5f5;
}

.profile-header {
  display: flex;
  align-items: center;
}

.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 20px;
}

.profile-info {
  text-align: left;
}

.profile-info h1 {
  margin: 0;
}

.profile-stats {
  margin-top: 10px;
}

main {
  display: flex;
}

aside {
  width: 250px;
  padding: 20px;
  background: #f5f5f5;
}

aside button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

aside button:hover {
  background: #2980b9;
}

.playlist-achievements h2,
.overall-satisfaction h2 {
  text-align: left;
}

.playlist-achievements ul,
.overall-satisfaction ul {
  text-align: left;
  list-style: none;
  padding: 0;
}

.playlist-collection {
  flex-grow: 1;
  padding: 20px;
}

.filter {
  text-align: left;
  margin-bottom: 20px;
}

.filter input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.playlist-card {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 20px;
}

.playlist-card img {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  margin-right: 20px;
}

.playlist-details {
  text-align: left;
}

.playlist-images {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.playlist-images img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
}

.likes-dislikes {
  margin-top: 10px;
}

footer {
  padding: 20px;
  background: #f5f5f5;
}

footer button {
  padding: 10px 20px;
  background: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

footer button:hover {
  background: #2980b9;
}
</style>
