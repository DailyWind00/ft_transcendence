<script>
export default {
  name: 'TestThreeJS',
  mounted() {
	import('./main.js')
	  .then(module => {
	  })
	  .catch(err => {
		console.error('Erreur lors de l’importation du module:', err);
	  });
  }
}
</script>