<template>
  <transition name="fade">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "EditFormModal"
};
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  vertical-align: middle;
}

.modal-container {
  margin-top: 5rem;
  width: 40rem;
  margin: 0px auto;
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 2px;
  transition: all 0.3s ease;
}
.button {
  font-family: "IranSANS";
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.8rem;
  border-radius: 0.3rem;
  outline: none;
  color: #fff;
  margin-top: 2rem;
  border: 1px solid #fff;
  background-color: #42b983;
  cursor: pointer;
}
</style>
