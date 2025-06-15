<template>
  <section class="values-section">
    <h2 class="values-title">AESTHETICS Core Values</h2>
    <p class="values-intro">
      Our values are at the heart of everything we do. Each letter in <span class="brand">AESTHETICS</span> represents a core value that defines our culture and commitment to you.
    </p>
    <div class="values-list">
      <div v-for="(item, idx) in values" :key="idx" class="value-item">
        <span class="value-letter">{{ item.letter }}</span>
        <div class="value-content">
          <h3 class="value-name">{{ item.name }}</h3>
          <p class="value-desc">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AestheticsValues',
  data() {
    return {
      values: [
        { letter: 'A', name: 'Authenticity', desc: 'We stay true to our creative vision and deliver genuine solutions for every client.' },
        { letter: 'E', name: 'Excellence', desc: 'We pursue the highest standards in design, service, and results.' },
        { letter: 'S', name: 'Simplicity', desc: 'We believe in clear, effective, and beautiful solutions.' },
        { letter: 'T', name: 'Teamwork', desc: 'We collaborate and support each other to achieve the best outcomes.' },
        { letter: 'H', name: 'Honesty', desc: 'We are transparent and trustworthy in all our dealings.' },
        { letter: 'E', name: 'Empathy', desc: 'We listen and understand your needs to create meaningful connections.' },
        { letter: 'T', name: 'Tenacity', desc: 'We are persistent and resilient, always striving for your success.' },
        { letter: 'I', name: 'Innovation', desc: 'We embrace creativity and new ideas to keep you ahead.' },
        { letter: 'C', name: 'Customer Focus', desc: 'Your satisfaction is our top priority.' },
        { letter: 'S', name: 'Sustainability', desc: 'We design with responsibility for a better future.' },
      ]
    }
  }
}
</script>

<style scoped>
.values-section {
  background: rgba(255,255,255,0.07);
  color: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 4px 24px rgba(230,0,45,0.08);
  width: 100%;
  max-width: 500px;
  margin: 2.5rem auto 0 auto;
  padding: 2rem 1.5rem 2.5rem 1.5rem;
  text-align: center;
  position: static;
  left: unset;
  right: unset;
  transform: none;
  overflow-x: auto;
}
.values-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1.2rem;
  color: #ff6f61;
  letter-spacing: -1px;
}
.values-intro {
  font-size: 1.1rem;
  color: #ffb88c;
  margin-bottom: 2rem;
}
.brand {
  color: #e6002d;
  font-weight: bold;
  letter-spacing: 0.2em;
}
.values-list {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  align-items: stretch;
  justify-content: center;
  width: 100%;
}
.value-item {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1rem;
  background: rgba(255,255,255,0.04);
  border-radius: 0.8rem;
  padding: 0.5rem 0.7rem;
  box-shadow: 0 2px 8px rgba(230,0,45,0.04);
  width: 100%;
  max-width: 100%;
  margin-bottom: 0;
}
.value-letter {
  font-size: 1.7rem;
  font-weight: 900;
  color: #ff6f61;
  min-width: 2.2rem;
  text-align: center;
  flex-shrink: 0;
}
.value-content {
  text-align: left;
  flex: 1;
}
.value-name {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.2rem;
  color: #fff;
}
.value-desc {
  font-size: 1rem;
  color: #ffb88c;
}
@media (max-width: 900px) {
  .values-section {
    width: 100%;
    max-width: 100%;
    left: 0;
    right: 0;
    transform: none;
    padding: 1.5rem 0.5rem;
  }
  .values-list {
    flex-direction: column;
    gap: 0.7rem;
    overflow-x: visible;
    padding: 0;
  }
  .value-item {
    max-width: 100%;
    min-width: 0;
    width: 100%;
    flex-direction: row;
  }
}
</style>
