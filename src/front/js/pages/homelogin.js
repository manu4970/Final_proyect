import React, { useContext, useEffect, useState } from "react";
import "../../styles/home.css";
import CanchaCard from "../component/CanchaCard";
import { Context } from "../store/appContext";


export const HomeLogin = () => {
    const [comunasRegion, setcomunasRegion] = useState([])
    const [filteredRegion, setFilteredRegion] = useState("")
    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedComuna, setSelectedComuna] = useState("");


    const comunas = [
        {
            region: "Metropolitana",
            comunas: [
                "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "Santiago", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"
            ]
        },

        {
            region: "Valparaíso",
            comunas: [
                "Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"]
        },

        {
            region: "Arica y Parinacota",
            comunas: [
                "Arica", "Camarones", "Putre", "General Lagos"]
        },

        {
            region: "Tarapaca",
            comunas: [
                "Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"]
        },

        {
            region: "Antofagasta",
            comunas: [
                "Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"]
        },

        {
            region: "Atacama",
            comunas: [
                "Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"]
        },

        {
            region: "Coquimbo",
            comunas: [
                "La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"]
        },

        {
            region: "Región del Libertador Gral. Bernardo O'Higgins",
            comunas: [
                "Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"]
        },

        {
            region: "Región del Maule",
            comunas: [
                "Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"]
        },

        {
            region: "Ñuble",
            comunas: [
                "Cobquecura", "Coelemu", "Ninhue", "Portezuelo", "Quirihue", "Ránquil", "Treguaco", "Bulnes", "Chillán Viejo", "Chillán", "El Carmen", "Pemuco", "Pinto", "Quillón", "San Ignacio", "Yungay", "Coihueco", "Ñiquén", "San Carlos", "San Fabián", "San Nicolás"]
        },

        {
            region: "Bío Bío",
            comunas: [
                "Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"]
        },

        {
            region: "Araucanía",
            comunas: [
                "Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"]
        },

        {
            region: "Los Ríos",
            comunas: [
                "Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"]
        },

        {
            region: "Los Lagos",
            comunas: [
                "Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"]
        },

        {
            region: "Aysén",
            comunas: [
                "Coyhaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Tortel", "Chile Chico", "Río Ibáñez"]
        },

        {
            region: "Magallanes",
            comunas: [
                "Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos (Ex Navarino)", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
        },


    ]
    function buscarComunas(e) {
        e.preventDefault()
        const regionValue = e.target.value;
        setSelectedRegion(regionValue);
        setSelectedComuna(""); // Clear selected commune value when a new region is selected

        const filteredComunas = comunas.find((comuna) => comuna.region === regionValue);
        if (filteredComunas) {
            setcomunasRegion([...filteredComunas.comunas]);
        } else {
            setcomunasRegion([]);
        }

        setSelectedRegion(regionValue);
        if (e.target.value == "1") {
            let comunasSelect = comunas[0].comunas
            setcomunasRegion([...comunasSelect])
        }

        if (e.target.value == "2") {
            let comunasSelect = comunas[1].comunas
            setcomunasRegion([...comunasSelect])
        }

        if (e.target.value == "3") {
            let comunasSelect = comunas[2].comunas
            setcomunasRegion([...comunasSelect])
        }

        if (e.target.value == "4") {
            let comunasSelect = comunas[3].comunas
            setcomunasRegion([...comunasSelect])
        }

        if (e.target.value == "5") {
            let comunasSelect = comunas[4].comunas
            setcomunasRegion([...comunasSelect])
        }

        if (e.target.value == "6") {
            let comunasSelect = comunas[5].comunas
            setcomunasRegion([...comunasSelect])
        }

        if (e.target.value == "7") {
            let comunasSelect = comunas[6].comunas
            setcomunasRegion([...comunasSelect])
        }

        if (e.target.value == "8") {
            let comunasSelect = comunas[7].comunas
            setcomunasRegion([...comunasSelect])
        }

        if (e.target.value == "9") {
            let comunasSelect = comunas[8].comunas
            setcomunasRegion([...comunasSelect])
        }

        if (e.target.value == "10") {
            let comunasSelect = comunas[9].comunas
            setcomunasRegion([...comunasSelect])
        }

        if (e.target.value == "11") {
            let comunasSelect = comunas[10].comunas
            setcomunasRegion([...comunasSelect])
        }

        if (e.target.value == "12") {
            let comunasSelect = comunas[11].comunas
            setcomunasRegion([...comunasSelect])
        }

        if (e.target.value == "13") {
            let comunasSelect = comunas[12].comunas
            setcomunasRegion([...comunasSelect])
        }

        if (e.target.value == "14") {
            let comunasSelect = comunas[13].comunas
            setcomunasRegion([...comunasSelect])
        }

        if (e.target.value == "15") {
            let comunasSelect = comunas[14].comunas
            setcomunasRegion([...comunasSelect])
        }

        if (e.target.value == "16") {
            let comunasSelect = comunas[15].comunas
            setcomunasRegion([...comunasSelect])
        }






    }

    const { actions, store } = useContext(Context)

    useEffect(() => {
        actions.fetchCanchas().then(() => {
        })
    }, []);


    const filteredCanchas = filteredRegion
        ? store.canchas.filter((cancha) => cancha.region.includes(filteredRegion))
        : store.canchas;


    console.log(filteredCanchas)

    return (
        <>
            <div className="container-fluid d-flex align-items-center justify-content-center mt-5">
                <div className="d-flex p-3 gap-2 mt-5">
                    <select className="form-select " defaultValue={selectedRegion} aria-label=".form-select-sm example" onChange={e => { buscarComunas(e); setFilteredRegion(e.target.value); }}>
                        <option value="">Region</option>
                        <option value="1">Metropolitana</option>
                        <option value="2">Valparaíso</option>
                        <option value="3">Arica y Parinacota</option>
                        <option value="4">Tarapaca</option>
                        <option value="5">Antofagasta</option>
                        <option value="6">Atacama</option>
                        <option value="7">Coquimbo</option>
                        <option value="8">O'Higgins</option>
                        <option value="9">Maule</option>
                        <option value="10">Ñuble</option>
                        <option value="11">Bío Bío</option>
                        <option value="12">La Araucanía</option>
                        <option value="13">Los Ríos</option>
                        <option value="14">Los Lagos</option>
                        <option value="15">Aysén</option>
                        <option value="16">Magallanes</option>
                    </select>
                    <select className="form-select" aria-label=".form-select-sm example" form-select-bg-size="true" defaultValue="defaultComuna" onChange={(e) => setSelectedComuna(e.target.value)}
                    >
                        <option value="">Commune</option>
                        {
                            comunasRegion.map((comuna, index) =>
                                <option key={index} value={comuna}>{comuna}</option>
                            )
                        }

                    </select>
                    <select className="form-select" aria-label=".form-select-sm example">
                        <option value="">Sport</option>
                        <option value="1">Tennis</option>
                        <option value="2">Football</option>
                        <option value="3">Paddle</option>
                        <option value="4">Basketball</option>
                        <option value="5">Baby Football</option>
                    </select>
                </div>

            </div>
            <section>
                <div className="parent col-sm-12 mb-sm-6 align-items-center justify-content-center ms-left">
                    {selectedComuna
                        ? store.canchas
                            .filter((cancha) => cancha.region.includes(selectedRegion) && cancha.comuna.includes(selectedComuna))
                            .map((cancha) => (
                                <CanchaCard className="" key={cancha.id} cancha={cancha} />
                            ))
                        : store.canchas
                            .filter((cancha) => cancha.region.includes(selectedRegion))
                            .map((cancha) => (
                                <CanchaCard className="" key={cancha.id} cancha={cancha} />
                            ))}
                </div>
            </section>
        </>
    )
};