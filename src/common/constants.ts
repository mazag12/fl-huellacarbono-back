export enum TipoReporte {
    AGUA = 'tb_huellacarbono_agua_ingreso',
    CONSUMO_SEIN = 'tb_huellacarbono_consumo_sein_ingreso',
    ELECTRICIDAD = 'tb_huellacarbono_electricidad_ingreso',
    PAPEL = 'tb_huellacarbono_papel_ingreso',
    REFRIGERANTE = 'tb_huellacarbono_refrigerante_ingreso',
    TRANSPORTE_AEREO = 'tb_huellacarbono_transporte_aereo_ingreso',
    TRANSPORTE_CASA_TRABAJO = 'tb_huellacarbono_transporte_casa_trabajo_ingreso',
    TRANSPORTE_INSUMOS = 'tb_huellacarbono_transporte_insumos_ingreso',
    TRANSPORTE_PROPIO = 'tb_huellacarbono_transporte_propio_ingreso',
    TRANSPORTE_RESIDUOS = 'tb_huellacarbono_transporte_residuos_ingreso',
    TRANSPORTE_TERRESTRE = 'tb_huellacarbono_transporte_terrestre_ingreso'
}

export enum TipoDate {
    ANIO = 'YEAR',
    MES = 'MONTH',
    DIA = 'DAY'
}

export enum ColumnasParaIngresos {
    tb_huellacarbono_agua_ingreso = 'medidor, fecha_ingreso, area, evidencia_url',
    tb_huellacarbono_consumo_sein_ingreso = 'tb_huellacarbono_consumo_sein_tipo.nombre as tipo_consumo_sein_nombre, suministro, SUM(cantidad), fecha_ingreso, area, evidencia_url',
    tb_huellacarbono_electricidad_ingreso = 'tb_huellacarbono_electricidad_tipo.nombre as tipo_electricidad_nombre, SUM(cantidad), fecha_ingreso, area, evidencia_url, factura',
    tb_huellacarbono_fuga_sf6_ingreso = 'tb_huellacarbono_fuga_sf6_tipo.nombre as tipo_fuga_sf6_nombre, SUM(cantidad), fecha_ingreso, area, evidencia_url',
    tb_huellacarbono_papel_ingreso = 'tb_huellacarbono_papel_tipo.nombre as tipo_papel_nombre, SUM(cantidad), fecha_ingreso, reciclado, nombre_certificado, densidad, area, evidencia_url',
    tb_huellacarbono_refrigerante_ingreso = 'tb_huellacarbono_refrigerante_tipo.nombre as tipo_refrigerante_nombre, tb_huellacarbono_refrigerante_equipo.nombre as equipo_refrigerante_nombre, SUM(cantidad), fecha_ingreso, area, evidencia_url',
    tb_huellacarbono_transporte_aereo_ingreso = 'tb_huellacarbono_transporte_aereo_tipo.nombre as tipo_transporte_aereo_nombre, SUM(cantidad), fecha_ingreso, area, evidencia_url',
    tb_huellacarbono_transporte_casa_trabajo_ingreso = 'tb_huellacarbono_transporte_casa_trabajo_tipo.nombre as tipo_transporte_casa_trabajo_nombre, SUM(cantidad), fecha_ingreso, area, evidencia_url',
    tb_huellacarbono_transporte_insumos_ingreso = 'tb_huellacarbono_transporte_insumos_tipo.nombre as tipo_transporte_insumos_nombre, SUM(cantidad), fecha_ingreso, area, evidencia_url',
    tb_huellacarbono_transporte_propio_ingreso = 'tb_huellacarbono_transporte_propio_tipo.nombre as tipo_transporte_propio_nombre, SUM(cantidad), fecha_ingreso, area, evidencia_url',
    tb_huellacarbono_transporte_residuos_ingreso = 'tb_huellacarbono_transporte_residuos_tipo.nombre as tipo_transporte_residuos_nombre, SUM(cantidad), fecha_ingreso, area, evidencia_url',
    tb_huellacarbono_transporte_terrestre_ingreso = 'tb_huellacarbono_transporte_terrestre_tipo.nombre as tipo_transporte_terrestre_nombre, SUM(cantidad), fecha_ingreso, area, evidencia_url'
}

export enum AgrupamientoParaIngresos {
    tb_huellacarbono_agua_ingreso = 'medidor, fecha_ingreso, area, evidencia_url',
    tb_huellacarbono_consumo_sein_ingreso = 'tb_huellacarbono_consumo_sein_tipo.nombre, suministro, fecha_ingreso, area, evidencia_url',
    tb_huellacarbono_electricidad_ingreso = 'tb_huellacarbono_electricidad_tipo.nombre, fecha_ingreso, area, evidencia_url, factura',
    tb_huellacarbono_fuga_sf6_ingreso = 'tb_huellacarbono_fuga_sf6_tipo.nombre, fecha_ingreso, area, evidencia_url',
    tb_huellacarbono_papel_ingreso = 'tb_huellacarbono_papel_tipo.nombre, fecha_ingreso, area, evidencia_url',
    tb_huellacarbono_refrigerante_ingreso = 'tb_huellacarbono_refrigerante_tipo.nombre, tb_huellacarbono_refrigerante_equipo.nombre, fecha_ingreso, area, evidencia_url',
    tb_huellacarbono_transporte_aereo_ingreso = 'tb_huellacarbono_transporte_aereo_tipo.nombre, fecha_ingreso, area, evidencia_url',
    tb_huellacarbono_transporte_casa_trabajo_ingreso = 'tb_huellacarbono_transporte_casa_trabajo_tipo.nombre, fecha_ingreso, area, evidencia_url',
    tb_huellacarbono_transporte_insumos_ingreso = 'tb_huellacarbono_transporte_insumos_tipo.nombre, fecha_ingreso, area, evidencia_url',
    tb_huellacarbono_transporte_propio_ingreso = 'tb_huellacarbono_transporte_propio_tipo.nombre, fecha_ingreso, area, evidencia_url',
    tb_huellacarbono_transporte_residuos_ingreso = 'tb_huellacarbono_transporte_residuos_tipo.nombre, fecha_ingreso, area, evidencia_url',
    tb_huellacarbono_transporte_terrestre_ingreso = 'tb_huellacarbono_transporte_terrestre_tipo.nombre, fecha_ingreso, area, evidencia_url'
}

export enum TablasParaTiposPorIngreso {
    tb_huellacarbono_agua_ingreso = '',
    tb_huellacarbono_consumo_sein_ingreso = 'INNER JOIN tb_huellacarbono_consumo_sein_tipo ON tb_huellacarbono_consumo_sein_ingreso.tipo_consumo_sein_id = tb_huellacarbono_consumo_sein_tipo.id',
    tb_huellacarbono_electricidad_ingreso = 'INNER JOIN tb_huellacarbono_electricidad_tipo ON tb_huellacarbono_electricidad_ingreso.tipo_electricidad_id = tb_huellacarbono_electricidad_tipo.id',
    tb_huellacarbono_fuga_sf6_ingreso = 'INNER JOIN tb_huellacarbono_fuga_sf6_tipo ON tb_huellacarbono_fuga_sf6_ingreso.tipo_fuga_sf6_id = tb_huellacarbono_fuga_sf6_tipo.id',
    tb_huellacarbono_papel_ingreso = 'INNER JOIN tb_huellacarbono_papel_tipo ON tb_huellacarbono_papel_ingreso.tipo_papel_id = tb_huellacarbono_papel_tipo.id',
    tb_huellacarbono_refrigerante_ingreso = 'INNER JOIN tb_huellacarbono_refrigerante_tipo ON tb_huellacarbono_refrigerante_ingreso.tipo_refrigerante_id = tb_huellacarbono_refrigerante_tipo.id INNER JOIN tb_huellacarbono_refrigerante_equipo ON tb_huellacarbono_refrigerante_ingreso.equipo_refrigerante_id = tb_huellacarbono_refrigerante_equipo.id',
    tb_huellacarbono_transporte_aereo_ingreso = 'INNER JOIN tb_huellacarbono_transporte_aereo_tipo ON tb_huellacarbono_transporte_aereo_ingreso.tipo_transporte_aereo_id = tb_huellacarbono_transporte_aereo_tipo.id',
    tb_huellacarbono_transporte_casa_trabajo_ingreso = 'INNER JOIN tb_huellacarbono_transporte_casa_trabajo_tipo ON tb_huellacarbono_transporte_casa_trabajo_ingreso.tipo_transporte_casa_trabajo_id = tb_huellacarbono_transporte_casa_trabajo_tipo.id',
    tb_huellacarbono_transporte_insumos_ingreso = 'INNER JOIN tb_huellacarbono_transporte_insumos_tipo ON tb_huellacarbono_transporte_ingreso.tipo_transporte_insumos_id = tb_huellacarbono_transporte_insumos_tipo.id',
    tb_huellacarbono_transporte_propio_ingreso = 'INNER JOIN tb_huellacarbono_transporte_propio_tipo ON tb_huellacarbono_transporte_propio_ingreso.tipo_transporte_propio_id = tb_huellacarbono_transporte_propio_tipo.id',
    tb_huellacarbono_transporte_residuos_ingreso = 'INNER JOIN tb_huellacarbono_transporte_residuos_tipo ON tb_huellacarbono_transporte_residuos_ingreso.tipo_transporte_residuos_id = tb_huellacarbono_transporte_residuos_tipo.id',
    tb_huellacarbono_transporte_terrestre_ingreso = 'INNER JOIN tb_huellacarbono_transporte_terrestre_tipo ON tb_huellacarbono_transporte_terrestre_ingreso.tipo_transporte_terrestre_id = tb_huellacarbono_transporte_terrestre_tipo.id'
}
