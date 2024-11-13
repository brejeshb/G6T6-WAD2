<template>
    <footer class="footer-container">
      <div class="footer-content">
        <!-- Company Info Section -->
        <div class="company-info">
          <h2 class="section-title">Recycle Lah</h2>
          <div class="contact-details">
            <div class="contact-item">
              <i class="fas fa-map-marker-alt"></i>
              <p>81 Victoria St, Singapore 188065</p>
            </div>
            <router-link to="mailto:hnmok@smu.edu.sg" class="contact-item email-link">
              <i class="fas fa-envelope"></i>
              <span>hnmok@smu.edu.sg</span>
            </router-link>
  
            <!-- GitHub Icon Link -->
            <div class="contact-item">
              <a href="https://github.com/brejeshb/G6T6-WAD2" target="_blank" class="github-link">
                <i class="fa-brands fa-github"></i> <!-- GitHub Icon -->
              </a>
            </div>
          </div>
        </div>
  
        <!-- Features Section -->
        <div class="features-section">
          <h2 class="section-title">Features</h2>
          <div class="features-grid">
            <router-link v-for="feature in features" 
              :key="feature.name" 
              :to="feature.link" 
              class="feature-item">
              <span class="feature-icon">{{ feature.icon }}</span>
              <span class="feature-name">{{ feature.name }}</span>
            </router-link>
          </div>
        </div>
  
        <!-- Technologies Section -->
        <div class="tech-section">
          <h2 class="section-title">Technologies</h2>
          <div class="tech-stack">
            <span v-for="tech in technologies" 
              :key="tech" 
              class="tech-tag">
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
  
      <!-- Team Section -->
      <div class="team-section">
        <h2 class="section-title">Meet Our Team</h2>
        <div class="team-grid">
          <div v-for="member in teamMembers" 
            :key="member.id" 
            class="member-card"
            @mouseenter="showMemberDetails(member.id)"
            @mouseleave="hideMemberDetails">
            <div class="member-avatar">
              <div class="avatar-circle">
                {{ getInitials(member.name) }}
              </div>
            </div>
            <div class="member-info">
              <h3>{{ member.name }}</h3>
              <p class="member-role">{{ member.role }}</p>
              <div class="social-links" :class="{ 'active': activeMember === member.id }">
                <a :href="member.github" class="social-link" target="_blank">
                  <i class="fa-brands fa-github"></i>
                </a>
                <a :href="member.linkedin" class="social-link" target="_blank">
                  <i class="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <p>&copy; 2024 WAD II Project. All rights reserved.</p>
        <div class="footer-note">
          Made with <span class="heart">♥</span> remotely from Singapore
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer',
    data() {
      return {
        activeMember: null,
        features: [
          { icon: '📊', name: 'Dashboard', link: '/Dashboard' },
          { icon: '🔍', name: 'RecycleNow', link: '/RecycleNow' },
          { icon: '📚', name: 'Education Hub', link: '/Education/Video' },
          { icon: '🛍️', name: 'Shop', link: '/Forest' },
          { icon: '🏆', name: 'Leaderboard', link: '/Leaderboard' },
          { icon: '❓', name: 'Quiz', link: '/Education/Quiz' }
        ],
        technologies: ['Bootstrap', 'Vue', 'Chart JS', 'CSS', 'HTML', 'Javascript'],
        teamMembers: [
          { id: 'weilun', name: 'Wei Lun', role: 'Member', github: '#', linkedin: '#' },
          { id: 'brejesh', name: 'Brejesh', role: 'Member', github: '#', linkedin: '#' },
          { id: 'anna', name: 'Anna', role: 'Leader', github: '#', linkedin: '#' },
          { id: 'yiluan', name: 'Yi Luan', role: 'Member', github: '#', linkedin: '#' },
          { id: 'chensang', name: 'Chen Sang', role: 'Member', github: '#', linkedin: '#' }
        ]
      }
    },
    methods: {
      showMemberDetails(memberId) {
        this.activeMember = memberId;
      },
      hideMemberDetails() {
        this.activeMember = null;
      },
      getInitials(name) {
        return name.split(' ')
          .map(word => word[0])
          .join('')
          .toUpperCase();
      }
    }
  }
  </script>
  
  <style scoped>
  .footer-container {
    background-color: #FEFAE0;
    padding: 4rem 2rem;
    color: #626F47;
  }
  
  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1.5fr 1fr;
    gap: 3rem;
    margin-bottom: 4rem;
  }
  
  .section-title {
    color: #798645;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }
  
  /* Company Info Styles */
  .contact-details {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #626F47;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .email-link:hover {
    color: #798645;
  }
  
  /* GitHub Icon Styling */
  .github-link {
    color: #626F47;
    font-size: 1.5rem;
    transition: color 0.3s ease;
  }
  
  .github-link:hover {
    color: #798645;
  }
  
  /* Features Grid Styles */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1rem;
  }
  
  .feature-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    text-decoration: none;
    color: #626F47;
    background-color: #F2EED7;
    border-radius: 8px;
    transition: all 0.3s ease;
  }
  
  .feature-item:hover {
    transform: translateY(-2px);
    background-color: #798645;
    color: #FEFAE0;
  }
  
  .feature-icon {
    font-size: 1.25rem;
  }
  
  /* Tech Stack Styles */
  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  
  .tech-tag {
    background-color: #F2EED7;
    color: #626F47;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.875rem;
    transition: all 0.3s ease;
  }
  
  .tech-tag:hover {
    background-color: #798645;
    color: #FEFAE0;
  }
  
  /* Team Section Styles */
  .team-section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 0;
    border-top: 1px solid rgba(121, 134, 69, 0.2);
  }
  
  .team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }
  
  .member-card {
    background-color: #F2EED7;
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .member-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(121, 134, 69, 0.1);
  }
  
  .avatar-circle {
    width: 80px;
    height: 80px;
    background-color: #798645;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    color: #FEFAE0;
    font-size: 1.5rem;
    font-weight: 600;
  }
  
  .member-info h3 {
    color: #798645;
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
  
  .member-role {
    color: #626F47;
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }
  
  .social-links {
    display: flex;
    justify-content: center;
    gap: 1rem;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
  }
  
  .social-links.active {
    opacity: 1;
    transform: translateY(0);
  }
  
  .social-link {
    color: #626F47;
    font-size: 1.25rem;
    transition: color 0.3s ease;
  }
  
  .social-link:hover {
    color: #798645;
  }
  
  /* Footer Bottom Styles */
  .footer-bottom {
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 2rem;
    text-align: center;
    border-top: 1px solid rgba(121, 134, 69, 0.2);
  }
  
  .footer-note {
    margin-top: 0.5rem;
    color: #626F47;
  }
  
  .heart {
    color: #E25555;
    display: inline-block;
    animation: heartbeat 1.5s ease infinite;
  }
  
  @keyframes heartbeat {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
  
  /* Responsive Design */
  @media (max-width: 1024px) {
    .footer-content {
      grid-template-columns: 1fr 1fr;
    }
  
    .tech-section {
      grid-column: span 2;
    }
  }
  
  @media (max-width: 768px) {
    .footer-content {
      grid-template-columns: 1fr;
    }
  
    .tech-section {
      grid-column: span 1;
    }
  
    .team-grid {
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    }
  }
  
  @media (max-width: 480px) {
    .footer-container {
      padding: 2rem 1rem;
    }
  
    .team-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
  </style>
  