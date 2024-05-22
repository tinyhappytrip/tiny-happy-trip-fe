<template>
  <footer>
    <div class="footerContainer">
      <div class="socialIcons">
        <a href="https://github.com/sumin305">
          <div>
            <img src="@/assets/main/github.png" />
          </div>
        </a>
        <a href="https://github.com/mrcsbin">
          <div>
            <img src="@/assets/main/github.png" />
          </div>
        </a>
      </div>
      <div class="footerNav">
        <ul>
          <li>
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li>
            <a href="">About</a>
            <div class="description">소소하고 확실한 여행</div>
          </li>
          <li>
            <a href="">Our Team</a>
            <div class="description">조성빈</div>
            <div class="description">이수민</div>
            <div class="description">chatgpt 4.0</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="footerBottom">
      <p>Copyright &copy;2024; Designed by <span class="designer">SOOMBIM</span></p>
    </div>
  </footer>
</template>

<script></script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
footer {
  background-color: #111;
}
.footerContainer {
  width: 100%;
  padding: 10px;
}
.socialIcons {
  display: flex;
  justify-content: center;
}
.socialIcons a {
  text-decoration: none;
  border-radius: 50%;
}
.socialIcons a i {
  font-size: 2em;
  opacity: 0, 9;
}
.socialIcons a i div {
  margin: 0 auto;
}
.footerNav {
  margin-top: 30px;
}
.footerNav ul {
  display: flex;
  justify-content: center;
  list-style-type: none;
}
.footerNav ul li a {
  color: white;
  margin: 20px 60px;
  text-decoration: none;
  font-size: 1.3em;
  opacity: 0.7;
  transition: 0.5s;
}

.footerNav ul li div {
  margin: 10px;
}
.footerNav ul li a:hover {
  opacity: 1;
}
.footerBottom {
  background-color: #000;
  padding: 20px;
  text-align: center;
}
.footerBottom p {
  color: white;
}
.designer {
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 400;
  margin: 0px 5px;
}
@media (max-width: 700px) {
  .footerNav ul {
    flex-direction: column;
  }
  .footerNav ul li {
    width: 100%;
    text-align: center;
    margin: 10px;
  }
  .socialIcons a {
    padding: 8px;
    margin: 4px;
  }
}

img {
  width: 50px;
  height: 50px;
  background-color: #111;
  transition: 0.5s;
}

.description {
  color: white;
  text-align: center;
}

li > a {
  font-size: 10px;
  font-weight: bold;
  text-align: center;
}
</style>
