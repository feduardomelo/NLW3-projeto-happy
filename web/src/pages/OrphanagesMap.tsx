import React, { useEffect, useState }  from 'react'
import {Link} from 'react-router-dom'
import {FiPlus, FiArrowRight} from 'react-icons/fi'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet' //pacote para adicionar mapas


import mapMarkerImg from '../images/map-marker.svg'
import mapIcon from '../utils/mapIcon'
import api from '../services/api'

import '../styles/pages/orphanage-map.css'

interface Orphanage {
    id: number,
    latitude: number,
    longitude: number,
    name: string
}

function OrphanagesMap() {

    // (ESQUERDA) agora temos lista de orfanatos e uma função pra atualizar a lista(setOrphanage)
    // (DIREITA) useState tem a tipagem do typescript
    const [orphanages, setOrphanages ]= useState<Orphanage[]>([])

    //executa uma ação quando condição no array acontecer
    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data) // faz com que variável orphanages tenha conteúdo de reponse.data
        })
    }, [])


    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :) </p>
                </header>

                <footer>
                    <strong>Recife</strong>
                    <span>Pernambuco</span>
                </footer>
            </aside>

            <Map
                center={[-8.1201442,-34.8955189]} //latitude e longitude
                zoom={15}
                //1chave indica que é codigo javascript dentro do tsx e segunda chave indica que é um objeto
                style={{ width: '100%', height: '100%' }}
                >
                {/*<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
                <TileLayer 
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                
                {orphanages.map(orphanage => {
                    return(
                        <Marker
                            icon={mapIcon}
                            position= {[orphanage.latitude,orphanage.longitude]}
                            key={orphanage.id}
                        >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">   
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="#fff" />
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}

            </Map>
            

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>

        

    )
}

export default OrphanagesMap