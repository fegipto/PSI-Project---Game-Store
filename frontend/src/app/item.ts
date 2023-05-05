export interface Item {
    id: number;
    name: string;
    descricao:string;
    tipo:string;
    plataforma:string;
    idiomas:string;
    preco:number;
    classificacao:string;
    avaliacoes:number;
    imagens: {
      data: string;
      contentType: string;
    }[];
    date:Date;
    video:string;
}