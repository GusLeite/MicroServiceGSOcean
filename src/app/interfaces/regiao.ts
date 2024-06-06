import { Especie } from "./especie";
import { ProjetoConservacao } from "./projeto-conservacao";

export interface Regiao {
  regiao: string;
  temperaturaAgua: number;
  pH: number;
  nivelPoluicao: string;
  especies: Especie[];
  projetosConservacao: ProjetoConservacao[];
}
