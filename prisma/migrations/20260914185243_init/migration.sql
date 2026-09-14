-- CreateTable
CREATE TABLE "enderecos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "pais" TEXT NOT NULL DEFAULT 'Brasil'
);

-- CreateTable
CREATE TABLE "pessoas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "endereco_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "orgao_emissor" TEXT NOT NULL,
    "uf_emissor_rg" TEXT NOT NULL,
    "estado_civil" TEXT NOT NULL,
    "nacionalidade" TEXT NOT NULL,
    CONSTRAINT "pessoas_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "enderecos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "imoveis" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "endereco_id" TEXT NOT NULL,
    "proprietario_id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "condominio" TEXT,
    "codigo_agua" TEXT,
    "codigo_energia" TEXT,
    "codigo_iptu" TEXT,
    "numero_registro" TEXT,
    CONSTRAINT "imoveis_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "enderecos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "imoveis_proprietario_id_fkey" FOREIGN KEY ("proprietario_id") REFERENCES "pessoas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "contratos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imovel_id" TEXT NOT NULL,
    "inquilino_id" TEXT NOT NULL,
    "destinatario_id" TEXT NOT NULL,
    "tipo_locacao" TEXT NOT NULL,
    "garantia" TEXT NOT NULL,
    "data_inicio" TEXT NOT NULL,
    "duracao_meses" INTEGER NOT NULL,
    "data_fim" TEXT NOT NULL,
    "valor_aluguel" TEXT NOT NULL,
    "taxa_administracao" TEXT NOT NULL,
    "dia_vencimento" INTEGER NOT NULL,
    "proximo_reajuste" TEXT NOT NULL,
    "acrescimo_inquilino" TEXT NOT NULL,
    "adm_acrescimo_inquilino" TEXT NOT NULL,
    "desconto_inquilino" TEXT NOT NULL,
    "adm_desconto_inquilino" TEXT NOT NULL,
    "acrescimo_proprietario" TEXT NOT NULL,
    "desconto_proprietario" TEXT NOT NULL,
    "iptu" TEXT NOT NULL,
    "iptu_proprietario" TEXT NOT NULL,
    "condominio" TEXT NOT NULL,
    "condominio_proprietario" TEXT NOT NULL,
    "seguro_fianca" TEXT NOT NULL,
    "seguro_incendio" TEXT NOT NULL DEFAULT '0',
    "parcela_caucao" TEXT NOT NULL,
    "observacoes" TEXT,
    "pix" TEXT,
    "agencia_conta" TEXT,
    "retirada" BOOLEAN NOT NULL,
    "ativo" TEXT NOT NULL DEFAULT 'ativo',
    CONSTRAINT "contratos_imovel_id_fkey" FOREIGN KEY ("imovel_id") REFERENCES "imoveis" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "contratos_inquilino_id_fkey" FOREIGN KEY ("inquilino_id") REFERENCES "pessoas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "contratos_destinatario_id_fkey" FOREIGN KEY ("destinatario_id") REFERENCES "pessoas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "pessoas_cpf_key" ON "pessoas"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "pessoas_rg_key" ON "pessoas"("rg");
