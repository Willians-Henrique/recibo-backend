export const ESTADOS_CIVIS_VALIDOS = [
    'Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)', 'Separado(a) Legalmente', 'União Estável'
] as const;

export type EstadoCivil = typeof ESTADOS_CIVIS_VALIDOS[number];

export interface Pessoa {
    id: string;
    enderecoId: string;
    nome: string;
    telefone: string;
    email: string;
    cpf: string;
    rg: string;
    orgaoEmissor: string;
    ufEmissorRg: string;
    estadoCivil: EstadoCivil;
    nacionalidade: string;
}

export interface NovaPessoa {
    enderecoId: string;
    nome: string;
    telefone: string;
    email: string;
    cpf: string;
    rg: string;
    orgaoEmissor: string;
    ufEmissorRg: string;
    estadoCivil: EstadoCivil;
    nacionalidade: string;
}

export type AtualizarPessoa = Partial<NovaPessoa>;
