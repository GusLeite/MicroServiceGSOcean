import { NivelDePoluicao } from "../enums/nivel-de-poluicao";
import { StatusDeConservacao } from "../enums/status-de-conservacao";
import { Especie } from "./especie";
import { ProjetoConservacao } from "./projeto-conservacao";

export interface Regiao {
  regiao: string;
  temperaturaAgua: string;
  pH: string;
  nivelPoluicao: string;
  especies: Especie[];
  projetosConservacao: string[];
}
