import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm'
import Image from './Image'

@Entity('orphanages') 
export default class Orphanage {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string
    
    @Column()
    latitude: number
    
    @Column()
    longitude: number

    @Column()
    about: string;
    
    @Column()
    instructions: string;

    @Column()
    opening_hours: string;

    @Column()
    open_on_weekends: boolean;

    // cada orfanato pode ter várias imagens
    // primeira entrada: qual o tipo de retorno? No caso é Image(importado lá em cima)
    // segunda entrada é: dado a Imagem que recebi, qual o campo que retorna o relacionamento inverso? Ou seja, que me retorna o orfanato em si.
    @OneToMany(() => Image, image => image.orphanage, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'orphanage_id'}) // nome da coluna que armazena o relacionamento de orfanatos com imagens
    images: Image[] 
}
