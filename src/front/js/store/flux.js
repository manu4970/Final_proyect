const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			loginLoading: false,
			loginResp: null,
			users: [],
			userCanchas: [],
			addCanchaResp: [],
			canchas: [],
			imgProfile: [],
			imgCancha: [],
			user: [],
			id: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getid: () => {
				const store = getStore();
				return store.id
			},

			signup: async (email, pass, name, lastname) => {
				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"email": email,
						"password": pass,
						"name": name,
						"lastname": lastname
					})
				}
				try {

					const resp = await fetch('https://ss-api-render-2.onrender.com/signup', options)

					if (resp.status != 201) {
						return false;
					}

					const data = await resp.json()
					return true

				}
				catch (error) {
					console.error("error en signUp", error)
				}
			},

			login: async (email, pass) => {
				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						"email": email,
						"password": pass
					})
				}
				try {
					const resp = await fetch('https://ss-api-render-2.onrender.com/login', options)
					if (resp.status != 200) {
						setStore({ loginResp: true })
						return false
					}

					const data = await resp.json()
					sessionStorage.setItem("auth_token", data.auth_token)
					sessionStorage.setItem("id", data.id)
					sessionStorage.setItem("isLoggedIn", "true")

					return true

				}
				catch (error) {
					console.error("error en login")
				}
			},

			fetchUserCanchas: async (user_id) => {
				const options = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				};
				try {
					const resp = await fetch("https://ss-api-render-2.onrender.com/users/" + user_id + "/canchas", options);
					if (resp.status !== 200) {
						alert("Error fetching canchas");
						return true;
					}
					const data = await resp.json();
					setStore({ userCanchas: data })
					return data
				} catch (error) {
					console.error("Error in getCanchas:", error);
					return true;
				}
			},

			fetchCanchas: async () => {
				const options = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				};

				try {
					const resp = await fetch("https://ss-api-render-2.onrender.com/canchas", options);
					if (resp.status !== 200) {
						alert("Error fetching canchas");
						return true;
					}
					const data = await resp.json();
					setStore({ canchas: data })
					return data;
				} catch (error) {
					console.error("Error in getCanchas:", error);
					return true;
				}
			},

			getUser: async (user_id) => {
				const options = {
					method: "GET",
					headers: { Authorization: "Bearer " + sessionStorage.getItem("auth_token") }
				}
				try {
					const resp = await fetch('https://ss-api-render-2.onrender.com/user/' + user_id, options)
					if (resp.status != 200) {
						alert("error en fetch user")
						return false
					}

					const data = await resp.json()
					setStore({ user: data })
					return data

				}
				catch (error) {
					console.error("error en getUser")
				}
			},

			getCancha: async (cancha_id) => {
				const options = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				};
				try {
					const resp = await fetch("https://ss-api-render-2.onrender.com/canchas/" + cancha_id, options);
					if (resp.status !== 200) {
						alert("Error fetching cancha");
						return null;
					}

					const data = await resp.json();
					console.log(data);
					return data;
				} catch (error) {
					console.error("Error in getCancha:", error);
					return null;
				}
			},

			putCancha: async (cancha_id, name, location, region, comuna, apertura, cierre, precio, sportType, cantidad, detalle, is_available, user_id, img) => {
				const options = {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						"name": name,
						"location": location,
						"region": region,
						"comuna": comuna,
						"apertura": apertura,
						"cierre": cierre,
						"precio": precio,
						"user_id": user_id,
						"sportType": sportType,
						"cantidadCanchas": cantidad,
						"detalle": detalle,
						"is_available": is_available,
						"img": img
					})
				};
				try {
					const resp = await fetch("https://ss-api-render-2.onrender.com/canchas/" + cancha_id, options);
					if (resp.status !== 200) {
						alert("Error fetching cancha");
						return null;
					}

					const data = await resp.json();
					console.log(data);
					return data;
				} catch (error) {
					console.error("Error in getCancha:", error);
					return null;
				}
			},

			deleteCancha: async (cancha_id) => {
				const options = {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				};
				try {
					const resp = await fetch("https://ss-api-render-2.onrender.com/canchas/" + cancha_id, options);
					if (resp.status !== 200) {
						alert("Error fetching cancha");
						return null;
					}

					const data = await resp.json();
					console.log(data);
					return data;
				} catch (error) {
					console.error("Error in getCancha:", error);
					return null;
				}
			},



			pushCancha: async (name, location, region, comuna, apertura, cierre, precio, sportType, cantidad, detalle, is_available, user_id, img) => {

				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"name": name,
						"location": location,
						"region": region,
						"comuna": comuna,
						"apertura": apertura,
						"cierre": cierre,
						"precio": precio,
						"user_id": user_id,
						"sportType": sportType,
						"cantidadCanchas": cantidad,
						"detalle": detalle,
						"is_available": is_available,
						"img": img
					})

				}

				try {

					const resp = await fetch('https://ss-api-render-2.onrender.com/canchas', options)

					if (resp.status != 200) {
						setStore({ addCanchaResp: true })
						return false
					}

					const data = await resp.json()
					return true

				}
				catch (error) {
					console.error("error en signUp")
				}
			},


			getRentas: async () => {
				const options = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				};
				try {
					const resp = await fetch("https://ss-api-render-2.onrender.com/rentas", options);
					if (resp.status !== 200) {
						alert("Error fetching rentas");
						return null;
					}
					const data = await resp.json();
					return data;
				} catch (error) {
					console.error("Error in getRentas:", error);
					return null;
				}
			},

			saveImgProfile: async (img, user_id) => {
				const options = {
					method: "POST",
					headers: {
						"Authorization": "Bearer " + sessionStorage.getItem("auth_token"),
						"Content-Type": "application/json" // Add Content-Type header
					},
					body: JSON.stringify({ img }) // Send the img data in the request body
				};

				try {
					const url = `https://ss-api-render-2.onrender.com/user/${user_id}`;
					const resp = await fetch(url, options);

					if (resp.status !== 200) {
						alert("error en fetch token");
						return false;
					}

					const data = await resp.json();
					sessionStorage.setItem("imgProfile", JSON.stringify(data));

					return true;
				} catch (error) {
					console.error("An error occurred:", error);
					return false;
				}
			},


			updateImgProfile: async (img, user_id) => {
				const options = {
					method: "PUT",
					headers: { Authorization: "Bearer " + sessionStorage.getItem("auth_token") },
					body: JSON.stringify(img)
				};

				try {
					const resp = await fetch(`https://ss-api-render-2.onrender.com/user/${user_id}`, options);

					if (resp.status !== 200) {
						alert("error en fetch img");
						return false;
					}

					const data = await resp.json();

					sessionStorage.setItem("imgProfile", data);

					return true;
				} catch (error) {
					console.error("error en login");
				}
			},
			rentCanchas: async (cancha_id, user_id, date, time, contadorArriendo) => {
				try {
					const options = {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							cancha_id,
							user_id,
							date,
							time,
							contadorArriendo
						})
					};

					const resp = await fetch('https://ss-api-render-2.onrender.com/rentas', options);
					if (resp.status !== 200) {
						alert("error en fetch rentas");
						return false;
					}

					const data = await resp.json();
					return true;
				} catch (error) {
					console.error("error Agregando Canchas");
				}
			},


			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

		}
	};
};

export default getState;
