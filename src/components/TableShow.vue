<template>
	<!-- eslint-disable -->
	<div class="table-show-containere">
		<SortedTable v-if="sortDisplay === 0" :values="values">
			<thead>
				<tr>
					<th scope="col" style="text-align: left; width: 10rem;">
						<SortLink name="id">TV Show ID</SortLink>
					</th>
					<th scope="col" style="text-align: left; width: 10rem;">
						<SortLink name="name">TV Show Name</SortLink>
					</th>
					<th scope="col" style="text-align: left; width: 10rem;">
						<SortLink name="first_air_datee">First Air Date</SortLink>
					</th>
				</tr>
			</thead>
			<template #body="sort">
				<tbody>
					<tr v-for="tvshow in sort.values" :key="tvshow.id">
						<td>{{ tvshow.id }}</td>
						<td>{{ tvshow.name }}</td>
						<td>{{ tvshow.first_air_date }}</td>
					</tr>
				</tbody>
			</template>
		</SortedTable>
		<table class="table table-responsive-sm" v-if="sortDisplay > 0">
			<thead>
				<tr>
					<th scope="col" style="text-align: left; width: 10rem;">
						TV Show ID
					</th>
					<th scope="col" style="text-align: left; width: 10rem;">
						TV Show Name
					</th>
					<th scope="col" style="text-align: left; width: 10rem;">
						First Air Date
					</th>
				</tr>
			</thead>

			<tbody>
				<tr v-for="index in sortDisplay" :key="values[index].id">
					<td>{{ values[index].id }}</td>
					<td>{{ values[index].name }}</td>
					<td>{{ values[index].first_air_date }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	export default {
		/* eslint-disable */
		props: {
			values: Array,
			sortDisplay: Number,
		},
		mounted() {},
		data: function() {
			return {}
		},
	}
</script>

<style lang="scss" scoped></style>
