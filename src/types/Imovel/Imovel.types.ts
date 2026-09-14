export const TIPOS_IMOVEL_VALIDOS = [
    'casa', 'apartamento', 'apartamento em condominio', 'casa comercial', 'casa em condominio',
    'cobertura', 'chacara', 'edicula', 'fazenda', 'flat', 'galpão', 'garagem', 'hotel', 'kitnet',
    'loft', 'prédio', 'ponto comercial', 'sala comercial', 'sitio', 'studio', 'terreno', 'consultorio'
] as const;

export type TipoImovel = typeof TIPOS_IMOVEL_VALIDOS[number];

export interface Imovel {
    id: string;
    enderecoId: string;
    proprietarioId: string;
    tipo: TipoImovel;
    condominio: string | null;
    codigoAgua: string | null;
    codigoEnergia: string | null;
    codigoIptu: string | null;
    numeroRegistro: string | null;
}

export interface NovoImovel {
    enderecoId: string;
    proprietarioId: string;
    tipo: TipoImovel;
    condominio?: string;
    codigoAgua?: string;
    codigoEnergia?: string;
    codigoIptu?: string;
    numeroRegistro?: string;
}

export type AtualizarImovel = Partial<NovoImovel>;
