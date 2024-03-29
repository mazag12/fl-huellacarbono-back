import { Between, Equal, In, Like, Not } from 'typeorm';
import PaginationDto from '../dto/pagination.dto';

export function conditionalOperator(operator: string, value: any) {
  switch (operator) {
    case 'eq':
      return Equal(value);
    case 'ne':
      return Not(Equal(value));
    case 'in':
      return In(value);
    case 'between':
      return Between(value[0], value[1]);
    case 'startsWith':
      return Like(`${value}%`);
    default:
      throw new Error(`Operador no válido: ${operator}`);
  }
}

export function createFilter(pg: PaginationDto) {
  const key = pg.key?.split(',');
  const operator = pg.operator?.split(',');
  const value = JSON.parse(pg.value || '{}');
  //* {{URL}}/end-point-x?key=id,fecha_creacion,eliminados&operator=eq,between,eq&value["10",["2023","2024"],"True"]

  return (key as any)?.reduce((acc, v, i) => {
    acc[v] = conditionalOperator(operator[i], value[i]);
    return acc;
  }, {});
}
