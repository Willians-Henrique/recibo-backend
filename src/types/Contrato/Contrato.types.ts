import type { Endereco } from '../Endereco/Endereco.types';
import type { Pessoa } from '../Pessoa/Pessoa.types';
import type { Imovel } from '../Imovel/Imovel.types';

export const TIPOS_LOCACAO_VALIDOS = [
    'Residencial', 'Nao residencial', 'Comercial', 'Industrial',
    'Temporada', 'Mista', 'Arrendamento Rural', 'Parceria Rural'
] as const;

export const GARANTIAS_VALIDAS = ['Caução', 'Fiador', 'Seguro Fiança'] as const;
export const STATUS_CONTRATO_VALIDOS = ['ativo', 'encerrado'] as const;

export type TipoLocacao = typeof TIPOS_LOCACAO_VALIDOS[number];
export type Garantia = typeof GARANTIAS_VALIDAS[number];
export type StatusContrato = typeof STATUS_CONTRATO_VALIDOS[number];

export interface Contrato {
    id: string;
    imovelId: string;
    inquilinoId: string;
    destinatarioId: string;
    tipoLocacao: TipoLocacao;
    garantia: Garantia;
    dataInicio: string;
    duracaoMeses: number;
    dataFim: string;
    valorAluguel: string;
    taxaAdministracao: string;
    diaVencimento: number;
    proximoReajuste: string;
    acrescimoInquilino: string;
    admAcrescimoInquilino: string;
    descontoInquilino: string;
    admDescontoInquilino: string;
    acrescimoProprietario: string;
    descontoProprietario: string;
    iptu: string;
    iptuProprietario: string;
    condominio: string;
    condominioProprietario: string;
    seguroFianca: string;
    seguroIncendio: string;
    parcelaCaucao: string;
    observacoes: string | null;
    pix: string | null;
    agenciaConta: string | null;
    retirada: boolean;
    ativo: StatusContrato;
}

export interface NovoContrato {
    imovelId: string;
    inquilinoId: string;
    destinatarioId: string;
    tipoLocacao: TipoLocacao;
    garantia: Garantia;
    dataInicio: string;
    duracaoMeses: number;
    dataFim: string;
    valorAluguel: string;
    taxaAdministracao: string;
    diaVencimento: number;
    proximoReajuste: string;
    acrescimoInquilino: string;
    admAcrescimoInquilino: string;
    descontoInquilino: string;
    admDescontoInquilino: string;
    acrescimoProprietario: string;
    descontoProprietario: string;
    iptu: string;
    iptuProprietario: string;
    condominio: string;
    condominioProprietario: string;
    seguroFianca: string;
    seguroIncendio?: string;
    parcelaCaucao: string;
    observacoes?: string;
    pix?: string;
    agenciaConta?: string;
    retirada: boolean;
    ativo?: StatusContrato;
}

export type AtualizarContrato = Partial<NovoContrato>;

// retorno explícito do "recibo": contrato + imóvel (com endereço e proprietário) + inquilino/destinatário, cada um com seu endereço
export interface ContratoComRelacoes extends Contrato {
    imovel: Imovel & {
        endereco: Endereco;
        proprietario: Pessoa & { endereco: Endereco };
    };
    inquilino: Pessoa & { endereco: Endereco };
    destinatario: Pessoa & { endereco: Endereco };
}

export interface ContratoResumo {
    id: string;
    inquilinoId: string;
    inquilinoNome: string;
    proprietarioNome: string;
    endereco: Endereco;
}
