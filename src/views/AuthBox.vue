<script setup>
import {onMounted} from "vue";
import {useRouter} from "vue-router";

onMounted(() => {
  useRouter().push("/");
});
</script>

  <template>

  <div>
    <meta http-equiv="Content-Security-Policy" content="default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'">
    <h1>Authentication in progress</h1>
  </div>
</template> 

<style scoped>

</style>