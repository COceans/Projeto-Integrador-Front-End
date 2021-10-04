import { Produto } from "./Produto";

export class Categoria {
    public id: number;
    public ativo: boolean;
    public embalagens: string;
    public material: string;
    public produto: Produto[]
}