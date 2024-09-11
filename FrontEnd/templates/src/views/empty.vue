<template>
<div style="margin: 100%"></div>
</template>

<script>
export default {
	destroyed() {
		window.location.reload();
		console.log('Le composant est détruit');
	}
}
</script>