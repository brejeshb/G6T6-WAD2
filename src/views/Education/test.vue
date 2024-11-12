<template>
            <div id="nav-bar">
          <nav class="navbar navbar-expand-lg bg-body-tertiary flex-column" data-aos="fade-left">
            <div class="container-fluid">
              <a class="navbar-brand ms-5" href="#" style="color:#686c44">Filter</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item" data-aos="fade-right">
                    <a href="#" class="nav-link" :class="{ 'active-filter': activeFilter === 'all' }"
                      :style="activeFilter === 'all' ? { color: 'white' } : {}"
                      @click.prevent="activeFilter = 'all'">All</a>
                  </li>
                  <li class="nav-item" data-aos="fade-right">
                    <a href="#" class="nav-link" :class="{ 'active-filter': activeFilter === 'recycling' }"
                      :style="activeFilter === 'recycling' ? { color: 'white' } : {}"
                      @click.prevent="activeFilter = 'recycling'">Recycle</a>
                  </li>
                  <li class="nav-item" data-aos="fade-right">
                    <a href="#" class="nav-link" :class="{ 'active-filter': activeFilter === 'upcycling' }"
                      :style="activeFilter === 'upcycling' ? { color: 'white' } : {}"
                      @click.prevent="activeFilter = 'upcycling'">Upcycle</a>
                  </li>
                </ul>
                <form class="d-flex" role="search" @submit.prevent data-aos="fade-left">
                  <input class="form-control me-3" type="search" placeholder="Search" aria-label="Search"
                    v-model="search">
                  <button class="btn btn-outline-success" type="button" @click="search = ''">Reset</button>
                </form>
              </div>
            </div>
          </nav>
        </div>
</template>