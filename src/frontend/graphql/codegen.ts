import { query, mutation } from "svelte-apollo";
import { writable } from "svelte/store";
import gql from "graphql-tag"
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  date: any;
  numeric: any;
  uuid: any;
};

/** columns and relationships of "Company" */
export type Company = {
  __typename?: 'Company';
  country: Scalars['String'];
  exchange: Scalars['String'];
  name: Scalars['String'];
  ticker: Scalars['String'];
};

/** aggregated selection of "Company" */
export type Company_aggregate = {
  __typename?: 'Company_aggregate';
  aggregate?: Maybe<Company_aggregate_fields>;
  nodes: Array<Company>;
};

/** aggregate fields of "Company" */
export type Company_aggregate_fields = {
  __typename?: 'Company_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Company_max_fields>;
  min?: Maybe<Company_min_fields>;
};


/** aggregate fields of "Company" */
export type Company_aggregate_fieldscountArgs = {
  columns?: Maybe<Array<Company_select_column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Company" */
export type Company_aggregate_order_by = {
  count?: Maybe<order_by>;
  max?: Maybe<Company_max_order_by>;
  min?: Maybe<Company_min_order_by>;
};

/** input type for inserting array relation for remote table "Company" */
export type Company_arr_rel_insert_input = {
  data: Array<Company_insert_input>;
  on_conflict?: Maybe<Company_on_conflict>;
};

/** Boolean expression to filter rows from the table "Company". All fields are combined with a logical 'AND'. */
export type Company_bool_exp = {
  _and?: Maybe<Array<Maybe<Company_bool_exp>>>;
  _not?: Maybe<Company_bool_exp>;
  _or?: Maybe<Array<Maybe<Company_bool_exp>>>;
  country?: Maybe<String_comparison_exp>;
  exchange?: Maybe<String_comparison_exp>;
  name?: Maybe<String_comparison_exp>;
  ticker?: Maybe<String_comparison_exp>;
};

/** unique or primary key constraints on table "Company" */
export enum Company_constraint {
  /** unique or primary key constraint */
  Company_pkey = 'Company_pkey'
}

/** input type for inserting data into table "Company" */
export type Company_insert_input = {
  country?: Maybe<Scalars['String']>;
  exchange?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  ticker?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Company_max_fields = {
  __typename?: 'Company_max_fields';
  country?: Maybe<Scalars['String']>;
  exchange?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  ticker?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "Company" */
export type Company_max_order_by = {
  country?: Maybe<order_by>;
  exchange?: Maybe<order_by>;
  name?: Maybe<order_by>;
  ticker?: Maybe<order_by>;
};

/** aggregate min on columns */
export type Company_min_fields = {
  __typename?: 'Company_min_fields';
  country?: Maybe<Scalars['String']>;
  exchange?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  ticker?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "Company" */
export type Company_min_order_by = {
  country?: Maybe<order_by>;
  exchange?: Maybe<order_by>;
  name?: Maybe<order_by>;
  ticker?: Maybe<order_by>;
};

/** response of any mutation on the table "Company" */
export type Company_mutation_response = {
  __typename?: 'Company_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Company>;
};

/** input type for inserting object relation for remote table "Company" */
export type Company_obj_rel_insert_input = {
  data: Company_insert_input;
  on_conflict?: Maybe<Company_on_conflict>;
};

/** on conflict condition type for table "Company" */
export type Company_on_conflict = {
  constraint: Company_constraint;
  update_columns: Array<Company_update_column>;
  where?: Maybe<Company_bool_exp>;
};

/** ordering options when selecting data from "Company" */
export type Company_order_by = {
  country?: Maybe<order_by>;
  exchange?: Maybe<order_by>;
  name?: Maybe<order_by>;
  ticker?: Maybe<order_by>;
};

/** primary key columns input for table: "Company" */
export type Company_pk_columns_input = {
  ticker: Scalars['String'];
};

/** select columns of table "Company" */
export enum Company_select_column {
  /** column name */
  country = 'country',
  /** column name */
  exchange = 'exchange',
  /** column name */
  name = 'name',
  /** column name */
  ticker = 'ticker'
}

/** input type for updating data in table "Company" */
export type Company_set_input = {
  country?: Maybe<Scalars['String']>;
  exchange?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  ticker?: Maybe<Scalars['String']>;
};

/** update columns of table "Company" */
export enum Company_update_column {
  /** column name */
  country = 'country',
  /** column name */
  exchange = 'exchange',
  /** column name */
  name = 'name',
  /** column name */
  ticker = 'ticker'
}

/** columns and relationships of "Currency" */
export type Currency = {
  __typename?: 'Currency';
  name: Scalars['String'];
  symbol: Scalars['String'];
};

/** aggregated selection of "Currency" */
export type Currency_aggregate = {
  __typename?: 'Currency_aggregate';
  aggregate?: Maybe<Currency_aggregate_fields>;
  nodes: Array<Currency>;
};

/** aggregate fields of "Currency" */
export type Currency_aggregate_fields = {
  __typename?: 'Currency_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Currency_max_fields>;
  min?: Maybe<Currency_min_fields>;
};


/** aggregate fields of "Currency" */
export type Currency_aggregate_fieldscountArgs = {
  columns?: Maybe<Array<Currency_select_column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Currency" */
export type Currency_aggregate_order_by = {
  count?: Maybe<order_by>;
  max?: Maybe<Currency_max_order_by>;
  min?: Maybe<Currency_min_order_by>;
};

/** input type for inserting array relation for remote table "Currency" */
export type Currency_arr_rel_insert_input = {
  data: Array<Currency_insert_input>;
  on_conflict?: Maybe<Currency_on_conflict>;
};

/** Boolean expression to filter rows from the table "Currency". All fields are combined with a logical 'AND'. */
export type Currency_bool_exp = {
  _and?: Maybe<Array<Maybe<Currency_bool_exp>>>;
  _not?: Maybe<Currency_bool_exp>;
  _or?: Maybe<Array<Maybe<Currency_bool_exp>>>;
  name?: Maybe<String_comparison_exp>;
  symbol?: Maybe<String_comparison_exp>;
};

/** unique or primary key constraints on table "Currency" */
export enum Currency_constraint {
  /** unique or primary key constraint */
  Currency_pkey = 'Currency_pkey'
}

/** input type for inserting data into table "Currency" */
export type Currency_insert_input = {
  name?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Currency_max_fields = {
  __typename?: 'Currency_max_fields';
  name?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "Currency" */
export type Currency_max_order_by = {
  name?: Maybe<order_by>;
  symbol?: Maybe<order_by>;
};

/** aggregate min on columns */
export type Currency_min_fields = {
  __typename?: 'Currency_min_fields';
  name?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "Currency" */
export type Currency_min_order_by = {
  name?: Maybe<order_by>;
  symbol?: Maybe<order_by>;
};

/** response of any mutation on the table "Currency" */
export type Currency_mutation_response = {
  __typename?: 'Currency_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Currency>;
};

/** input type for inserting object relation for remote table "Currency" */
export type Currency_obj_rel_insert_input = {
  data: Currency_insert_input;
  on_conflict?: Maybe<Currency_on_conflict>;
};

/** on conflict condition type for table "Currency" */
export type Currency_on_conflict = {
  constraint: Currency_constraint;
  update_columns: Array<Currency_update_column>;
  where?: Maybe<Currency_bool_exp>;
};

/** ordering options when selecting data from "Currency" */
export type Currency_order_by = {
  name?: Maybe<order_by>;
  symbol?: Maybe<order_by>;
};

/** primary key columns input for table: "Currency" */
export type Currency_pk_columns_input = {
  symbol: Scalars['String'];
};

/** select columns of table "Currency" */
export enum Currency_select_column {
  /** column name */
  name = 'name',
  /** column name */
  symbol = 'symbol'
}

/** input type for updating data in table "Currency" */
export type Currency_set_input = {
  name?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
};

/** update columns of table "Currency" */
export enum Currency_update_column {
  /** column name */
  name = 'name',
  /** column name */
  symbol = 'symbol'
}

/** columns and relationships of "Dividend" */
export type Dividend = {
  __typename?: 'Dividend';
  amount_posttax: Scalars['numeric'];
  amount_pretax: Scalars['numeric'];
  /** An object relationship */
  company?: Maybe<Company>;
  company_ticker: Scalars['String'];
  /** An object relationship */
  currency?: Maybe<Currency>;
  currency_symbol: Scalars['String'];
  date: Scalars['date'];
  id: Scalars['uuid'];
  user_id: Scalars['String'];
};

/** aggregated selection of "Dividend" */
export type Dividend_aggregate = {
  __typename?: 'Dividend_aggregate';
  aggregate?: Maybe<Dividend_aggregate_fields>;
  nodes: Array<Dividend>;
};

/** aggregate fields of "Dividend" */
export type Dividend_aggregate_fields = {
  __typename?: 'Dividend_aggregate_fields';
  avg?: Maybe<Dividend_avg_fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Dividend_max_fields>;
  min?: Maybe<Dividend_min_fields>;
  stddev?: Maybe<Dividend_stddev_fields>;
  stddev_pop?: Maybe<Dividend_stddev_pop_fields>;
  stddev_samp?: Maybe<Dividend_stddev_samp_fields>;
  sum?: Maybe<Dividend_sum_fields>;
  var_pop?: Maybe<Dividend_var_pop_fields>;
  var_samp?: Maybe<Dividend_var_samp_fields>;
  variance?: Maybe<Dividend_variance_fields>;
};


/** aggregate fields of "Dividend" */
export type Dividend_aggregate_fieldscountArgs = {
  columns?: Maybe<Array<Dividend_select_column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Dividend" */
export type Dividend_aggregate_order_by = {
  avg?: Maybe<Dividend_avg_order_by>;
  count?: Maybe<order_by>;
  max?: Maybe<Dividend_max_order_by>;
  min?: Maybe<Dividend_min_order_by>;
  stddev?: Maybe<Dividend_stddev_order_by>;
  stddev_pop?: Maybe<Dividend_stddev_pop_order_by>;
  stddev_samp?: Maybe<Dividend_stddev_samp_order_by>;
  sum?: Maybe<Dividend_sum_order_by>;
  var_pop?: Maybe<Dividend_var_pop_order_by>;
  var_samp?: Maybe<Dividend_var_samp_order_by>;
  variance?: Maybe<Dividend_variance_order_by>;
};

/** input type for inserting array relation for remote table "Dividend" */
export type Dividend_arr_rel_insert_input = {
  data: Array<Dividend_insert_input>;
  on_conflict?: Maybe<Dividend_on_conflict>;
};

/** aggregate avg on columns */
export type Dividend_avg_fields = {
  __typename?: 'Dividend_avg_fields';
  amount_posttax?: Maybe<Scalars['Float']>;
  amount_pretax?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "Dividend" */
export type Dividend_avg_order_by = {
  amount_posttax?: Maybe<order_by>;
  amount_pretax?: Maybe<order_by>;
};

/** Boolean expression to filter rows from the table "Dividend". All fields are combined with a logical 'AND'. */
export type Dividend_bool_exp = {
  _and?: Maybe<Array<Maybe<Dividend_bool_exp>>>;
  _not?: Maybe<Dividend_bool_exp>;
  _or?: Maybe<Array<Maybe<Dividend_bool_exp>>>;
  amount_posttax?: Maybe<numeric_comparison_exp>;
  amount_pretax?: Maybe<numeric_comparison_exp>;
  company?: Maybe<Company_bool_exp>;
  company_ticker?: Maybe<String_comparison_exp>;
  currency?: Maybe<Currency_bool_exp>;
  currency_symbol?: Maybe<String_comparison_exp>;
  date?: Maybe<date_comparison_exp>;
  id?: Maybe<uuid_comparison_exp>;
  user_id?: Maybe<String_comparison_exp>;
};

/** unique or primary key constraints on table "Dividend" */
export enum Dividend_constraint {
  /** unique or primary key constraint */
  Dividend_pkey = 'Dividend_pkey'
}

/** input type for incrementing integer column in table "Dividend" */
export type Dividend_inc_input = {
  amount_posttax?: Maybe<Scalars['numeric']>;
  amount_pretax?: Maybe<Scalars['numeric']>;
};

/** input type for inserting data into table "Dividend" */
export type Dividend_insert_input = {
  amount_posttax?: Maybe<Scalars['numeric']>;
  amount_pretax?: Maybe<Scalars['numeric']>;
  company?: Maybe<Company_obj_rel_insert_input>;
  company_ticker?: Maybe<Scalars['String']>;
  currency?: Maybe<Currency_obj_rel_insert_input>;
  currency_symbol?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['date']>;
  id?: Maybe<Scalars['uuid']>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Dividend_max_fields = {
  __typename?: 'Dividend_max_fields';
  amount_posttax?: Maybe<Scalars['numeric']>;
  amount_pretax?: Maybe<Scalars['numeric']>;
  company_ticker?: Maybe<Scalars['String']>;
  currency_symbol?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['date']>;
  id?: Maybe<Scalars['uuid']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "Dividend" */
export type Dividend_max_order_by = {
  amount_posttax?: Maybe<order_by>;
  amount_pretax?: Maybe<order_by>;
  company_ticker?: Maybe<order_by>;
  currency_symbol?: Maybe<order_by>;
  date?: Maybe<order_by>;
  id?: Maybe<order_by>;
  user_id?: Maybe<order_by>;
};

/** aggregate min on columns */
export type Dividend_min_fields = {
  __typename?: 'Dividend_min_fields';
  amount_posttax?: Maybe<Scalars['numeric']>;
  amount_pretax?: Maybe<Scalars['numeric']>;
  company_ticker?: Maybe<Scalars['String']>;
  currency_symbol?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['date']>;
  id?: Maybe<Scalars['uuid']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "Dividend" */
export type Dividend_min_order_by = {
  amount_posttax?: Maybe<order_by>;
  amount_pretax?: Maybe<order_by>;
  company_ticker?: Maybe<order_by>;
  currency_symbol?: Maybe<order_by>;
  date?: Maybe<order_by>;
  id?: Maybe<order_by>;
  user_id?: Maybe<order_by>;
};

/** response of any mutation on the table "Dividend" */
export type Dividend_mutation_response = {
  __typename?: 'Dividend_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Dividend>;
};

/** input type for inserting object relation for remote table "Dividend" */
export type Dividend_obj_rel_insert_input = {
  data: Dividend_insert_input;
  on_conflict?: Maybe<Dividend_on_conflict>;
};

/** on conflict condition type for table "Dividend" */
export type Dividend_on_conflict = {
  constraint: Dividend_constraint;
  update_columns: Array<Dividend_update_column>;
  where?: Maybe<Dividend_bool_exp>;
};

/** ordering options when selecting data from "Dividend" */
export type Dividend_order_by = {
  amount_posttax?: Maybe<order_by>;
  amount_pretax?: Maybe<order_by>;
  company?: Maybe<Company_order_by>;
  company_ticker?: Maybe<order_by>;
  currency?: Maybe<Currency_order_by>;
  currency_symbol?: Maybe<order_by>;
  date?: Maybe<order_by>;
  id?: Maybe<order_by>;
  user_id?: Maybe<order_by>;
};

/** primary key columns input for table: "Dividend" */
export type Dividend_pk_columns_input = {
  id: Scalars['uuid'];
};

/** select columns of table "Dividend" */
export enum Dividend_select_column {
  /** column name */
  amount_posttax = 'amount_posttax',
  /** column name */
  amount_pretax = 'amount_pretax',
  /** column name */
  company_ticker = 'company_ticker',
  /** column name */
  currency_symbol = 'currency_symbol',
  /** column name */
  date = 'date',
  /** column name */
  id = 'id',
  /** column name */
  user_id = 'user_id'
}

/** input type for updating data in table "Dividend" */
export type Dividend_set_input = {
  amount_posttax?: Maybe<Scalars['numeric']>;
  amount_pretax?: Maybe<Scalars['numeric']>;
  company_ticker?: Maybe<Scalars['String']>;
  currency_symbol?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['date']>;
  id?: Maybe<Scalars['uuid']>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Dividend_stddev_fields = {
  __typename?: 'Dividend_stddev_fields';
  amount_posttax?: Maybe<Scalars['Float']>;
  amount_pretax?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "Dividend" */
export type Dividend_stddev_order_by = {
  amount_posttax?: Maybe<order_by>;
  amount_pretax?: Maybe<order_by>;
};

/** aggregate stddev_pop on columns */
export type Dividend_stddev_pop_fields = {
  __typename?: 'Dividend_stddev_pop_fields';
  amount_posttax?: Maybe<Scalars['Float']>;
  amount_pretax?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "Dividend" */
export type Dividend_stddev_pop_order_by = {
  amount_posttax?: Maybe<order_by>;
  amount_pretax?: Maybe<order_by>;
};

/** aggregate stddev_samp on columns */
export type Dividend_stddev_samp_fields = {
  __typename?: 'Dividend_stddev_samp_fields';
  amount_posttax?: Maybe<Scalars['Float']>;
  amount_pretax?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "Dividend" */
export type Dividend_stddev_samp_order_by = {
  amount_posttax?: Maybe<order_by>;
  amount_pretax?: Maybe<order_by>;
};

/** aggregate sum on columns */
export type Dividend_sum_fields = {
  __typename?: 'Dividend_sum_fields';
  amount_posttax?: Maybe<Scalars['numeric']>;
  amount_pretax?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "Dividend" */
export type Dividend_sum_order_by = {
  amount_posttax?: Maybe<order_by>;
  amount_pretax?: Maybe<order_by>;
};

/** update columns of table "Dividend" */
export enum Dividend_update_column {
  /** column name */
  amount_posttax = 'amount_posttax',
  /** column name */
  amount_pretax = 'amount_pretax',
  /** column name */
  company_ticker = 'company_ticker',
  /** column name */
  currency_symbol = 'currency_symbol',
  /** column name */
  date = 'date',
  /** column name */
  id = 'id',
  /** column name */
  user_id = 'user_id'
}

/** aggregate var_pop on columns */
export type Dividend_var_pop_fields = {
  __typename?: 'Dividend_var_pop_fields';
  amount_posttax?: Maybe<Scalars['Float']>;
  amount_pretax?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "Dividend" */
export type Dividend_var_pop_order_by = {
  amount_posttax?: Maybe<order_by>;
  amount_pretax?: Maybe<order_by>;
};

/** aggregate var_samp on columns */
export type Dividend_var_samp_fields = {
  __typename?: 'Dividend_var_samp_fields';
  amount_posttax?: Maybe<Scalars['Float']>;
  amount_pretax?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "Dividend" */
export type Dividend_var_samp_order_by = {
  amount_posttax?: Maybe<order_by>;
  amount_pretax?: Maybe<order_by>;
};

/** aggregate variance on columns */
export type Dividend_variance_fields = {
  __typename?: 'Dividend_variance_fields';
  amount_posttax?: Maybe<Scalars['Float']>;
  amount_pretax?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "Dividend" */
export type Dividend_variance_order_by = {
  amount_posttax?: Maybe<order_by>;
  amount_pretax?: Maybe<order_by>;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_comparison_exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};


/** expression to compare columns of type date. All fields are combined with logical 'AND'. */
export type date_comparison_exp = {
  _eq?: Maybe<Scalars['date']>;
  _gt?: Maybe<Scalars['date']>;
  _gte?: Maybe<Scalars['date']>;
  _in?: Maybe<Array<Scalars['date']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['date']>;
  _lte?: Maybe<Scalars['date']>;
  _neq?: Maybe<Scalars['date']>;
  _nin?: Maybe<Array<Scalars['date']>>;
};

/** mutation root */
export type mutation_root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "Company" */
  delete_Company?: Maybe<Company_mutation_response>;
  /** delete single row from the table: "Company" */
  delete_Company_by_pk?: Maybe<Company>;
  /** delete data from the table: "Currency" */
  delete_Currency?: Maybe<Currency_mutation_response>;
  /** delete single row from the table: "Currency" */
  delete_Currency_by_pk?: Maybe<Currency>;
  /** delete data from the table: "Dividend" */
  delete_Dividend?: Maybe<Dividend_mutation_response>;
  /** delete single row from the table: "Dividend" */
  delete_Dividend_by_pk?: Maybe<Dividend>;
  /** insert data into the table: "Company" */
  insert_Company?: Maybe<Company_mutation_response>;
  /** insert a single row into the table: "Company" */
  insert_Company_one?: Maybe<Company>;
  /** insert data into the table: "Currency" */
  insert_Currency?: Maybe<Currency_mutation_response>;
  /** insert a single row into the table: "Currency" */
  insert_Currency_one?: Maybe<Currency>;
  /** insert data into the table: "Dividend" */
  insert_Dividend?: Maybe<Dividend_mutation_response>;
  /** insert a single row into the table: "Dividend" */
  insert_Dividend_one?: Maybe<Dividend>;
  /** update data of the table: "Company" */
  update_Company?: Maybe<Company_mutation_response>;
  /** update single row of the table: "Company" */
  update_Company_by_pk?: Maybe<Company>;
  /** update data of the table: "Currency" */
  update_Currency?: Maybe<Currency_mutation_response>;
  /** update single row of the table: "Currency" */
  update_Currency_by_pk?: Maybe<Currency>;
  /** update data of the table: "Dividend" */
  update_Dividend?: Maybe<Dividend_mutation_response>;
  /** update single row of the table: "Dividend" */
  update_Dividend_by_pk?: Maybe<Dividend>;
};


/** mutation root */
export type mutation_rootdelete_CompanyArgs = {
  where: Company_bool_exp;
};


/** mutation root */
export type mutation_rootdelete_Company_by_pkArgs = {
  ticker: Scalars['String'];
};


/** mutation root */
export type mutation_rootdelete_CurrencyArgs = {
  where: Currency_bool_exp;
};


/** mutation root */
export type mutation_rootdelete_Currency_by_pkArgs = {
  symbol: Scalars['String'];
};


/** mutation root */
export type mutation_rootdelete_DividendArgs = {
  where: Dividend_bool_exp;
};


/** mutation root */
export type mutation_rootdelete_Dividend_by_pkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type mutation_rootinsert_CompanyArgs = {
  objects: Array<Company_insert_input>;
  on_conflict?: Maybe<Company_on_conflict>;
};


/** mutation root */
export type mutation_rootinsert_Company_oneArgs = {
  object: Company_insert_input;
  on_conflict?: Maybe<Company_on_conflict>;
};


/** mutation root */
export type mutation_rootinsert_CurrencyArgs = {
  objects: Array<Currency_insert_input>;
  on_conflict?: Maybe<Currency_on_conflict>;
};


/** mutation root */
export type mutation_rootinsert_Currency_oneArgs = {
  object: Currency_insert_input;
  on_conflict?: Maybe<Currency_on_conflict>;
};


/** mutation root */
export type mutation_rootinsert_DividendArgs = {
  objects: Array<Dividend_insert_input>;
  on_conflict?: Maybe<Dividend_on_conflict>;
};


/** mutation root */
export type mutation_rootinsert_Dividend_oneArgs = {
  object: Dividend_insert_input;
  on_conflict?: Maybe<Dividend_on_conflict>;
};


/** mutation root */
export type mutation_rootupdate_CompanyArgs = {
  _set?: Maybe<Company_set_input>;
  where: Company_bool_exp;
};


/** mutation root */
export type mutation_rootupdate_Company_by_pkArgs = {
  _set?: Maybe<Company_set_input>;
  pk_columns: Company_pk_columns_input;
};


/** mutation root */
export type mutation_rootupdate_CurrencyArgs = {
  _set?: Maybe<Currency_set_input>;
  where: Currency_bool_exp;
};


/** mutation root */
export type mutation_rootupdate_Currency_by_pkArgs = {
  _set?: Maybe<Currency_set_input>;
  pk_columns: Currency_pk_columns_input;
};


/** mutation root */
export type mutation_rootupdate_DividendArgs = {
  _inc?: Maybe<Dividend_inc_input>;
  _set?: Maybe<Dividend_set_input>;
  where: Dividend_bool_exp;
};


/** mutation root */
export type mutation_rootupdate_Dividend_by_pkArgs = {
  _inc?: Maybe<Dividend_inc_input>;
  _set?: Maybe<Dividend_set_input>;
  pk_columns: Dividend_pk_columns_input;
};


/** expression to compare columns of type numeric. All fields are combined with logical 'AND'. */
export type numeric_comparison_exp = {
  _eq?: Maybe<Scalars['numeric']>;
  _gt?: Maybe<Scalars['numeric']>;
  _gte?: Maybe<Scalars['numeric']>;
  _in?: Maybe<Array<Scalars['numeric']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['numeric']>;
  _lte?: Maybe<Scalars['numeric']>;
  _neq?: Maybe<Scalars['numeric']>;
  _nin?: Maybe<Array<Scalars['numeric']>>;
};

/** column ordering options */
export enum order_by {
  /** in the ascending order, nulls last */
  asc = 'asc',
  /** in the ascending order, nulls first */
  asc_nulls_first = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  asc_nulls_last = 'asc_nulls_last',
  /** in the descending order, nulls first */
  desc = 'desc',
  /** in the descending order, nulls first */
  desc_nulls_first = 'desc_nulls_first',
  /** in the descending order, nulls last */
  desc_nulls_last = 'desc_nulls_last'
}

/** query root */
export type query_root = {
  __typename?: 'query_root';
  /** fetch data from the table: "Company" */
  Company: Array<Company>;
  /** fetch aggregated fields from the table: "Company" */
  Company_aggregate: Company_aggregate;
  /** fetch data from the table: "Company" using primary key columns */
  Company_by_pk?: Maybe<Company>;
  /** fetch data from the table: "Currency" */
  Currency: Array<Currency>;
  /** fetch aggregated fields from the table: "Currency" */
  Currency_aggregate: Currency_aggregate;
  /** fetch data from the table: "Currency" using primary key columns */
  Currency_by_pk?: Maybe<Currency>;
  /** fetch data from the table: "Dividend" */
  Dividend: Array<Dividend>;
  /** fetch aggregated fields from the table: "Dividend" */
  Dividend_aggregate: Dividend_aggregate;
  /** fetch data from the table: "Dividend" using primary key columns */
  Dividend_by_pk?: Maybe<Dividend>;
};


/** query root */
export type query_rootCompanyArgs = {
  distinct_on?: Maybe<Array<Company_select_column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Company_order_by>>;
  where?: Maybe<Company_bool_exp>;
};


/** query root */
export type query_rootCompany_aggregateArgs = {
  distinct_on?: Maybe<Array<Company_select_column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Company_order_by>>;
  where?: Maybe<Company_bool_exp>;
};


/** query root */
export type query_rootCompany_by_pkArgs = {
  ticker: Scalars['String'];
};


/** query root */
export type query_rootCurrencyArgs = {
  distinct_on?: Maybe<Array<Currency_select_column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Currency_order_by>>;
  where?: Maybe<Currency_bool_exp>;
};


/** query root */
export type query_rootCurrency_aggregateArgs = {
  distinct_on?: Maybe<Array<Currency_select_column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Currency_order_by>>;
  where?: Maybe<Currency_bool_exp>;
};


/** query root */
export type query_rootCurrency_by_pkArgs = {
  symbol: Scalars['String'];
};


/** query root */
export type query_rootDividendArgs = {
  distinct_on?: Maybe<Array<Dividend_select_column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dividend_order_by>>;
  where?: Maybe<Dividend_bool_exp>;
};


/** query root */
export type query_rootDividend_aggregateArgs = {
  distinct_on?: Maybe<Array<Dividend_select_column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dividend_order_by>>;
  where?: Maybe<Dividend_bool_exp>;
};


/** query root */
export type query_rootDividend_by_pkArgs = {
  id: Scalars['uuid'];
};

/** subscription root */
export type subscription_root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "Company" */
  Company: Array<Company>;
  /** fetch aggregated fields from the table: "Company" */
  Company_aggregate: Company_aggregate;
  /** fetch data from the table: "Company" using primary key columns */
  Company_by_pk?: Maybe<Company>;
  /** fetch data from the table: "Currency" */
  Currency: Array<Currency>;
  /** fetch aggregated fields from the table: "Currency" */
  Currency_aggregate: Currency_aggregate;
  /** fetch data from the table: "Currency" using primary key columns */
  Currency_by_pk?: Maybe<Currency>;
  /** fetch data from the table: "Dividend" */
  Dividend: Array<Dividend>;
  /** fetch aggregated fields from the table: "Dividend" */
  Dividend_aggregate: Dividend_aggregate;
  /** fetch data from the table: "Dividend" using primary key columns */
  Dividend_by_pk?: Maybe<Dividend>;
};


/** subscription root */
export type subscription_rootCompanyArgs = {
  distinct_on?: Maybe<Array<Company_select_column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Company_order_by>>;
  where?: Maybe<Company_bool_exp>;
};


/** subscription root */
export type subscription_rootCompany_aggregateArgs = {
  distinct_on?: Maybe<Array<Company_select_column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Company_order_by>>;
  where?: Maybe<Company_bool_exp>;
};


/** subscription root */
export type subscription_rootCompany_by_pkArgs = {
  ticker: Scalars['String'];
};


/** subscription root */
export type subscription_rootCurrencyArgs = {
  distinct_on?: Maybe<Array<Currency_select_column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Currency_order_by>>;
  where?: Maybe<Currency_bool_exp>;
};


/** subscription root */
export type subscription_rootCurrency_aggregateArgs = {
  distinct_on?: Maybe<Array<Currency_select_column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Currency_order_by>>;
  where?: Maybe<Currency_bool_exp>;
};


/** subscription root */
export type subscription_rootCurrency_by_pkArgs = {
  symbol: Scalars['String'];
};


/** subscription root */
export type subscription_rootDividendArgs = {
  distinct_on?: Maybe<Array<Dividend_select_column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dividend_order_by>>;
  where?: Maybe<Dividend_bool_exp>;
};


/** subscription root */
export type subscription_rootDividend_aggregateArgs = {
  distinct_on?: Maybe<Array<Dividend_select_column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dividend_order_by>>;
  where?: Maybe<Dividend_bool_exp>;
};


/** subscription root */
export type subscription_rootDividend_by_pkArgs = {
  id: Scalars['uuid'];
};


/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export type uuid_comparison_exp = {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Scalars['uuid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Scalars['uuid']>>;
};

export type dividendFragment = (
  { __typename?: 'Dividend' }
  & Pick<Dividend, 'id' | 'amount_pretax' | 'amount_posttax' | 'date'>
  & { company?: Maybe<(
    { __typename?: 'Company' }
    & Pick<Company, 'ticker' | 'name' | 'exchange' | 'country'>
  )>, currency?: Maybe<(
    { __typename?: 'Currency' }
    & Pick<Currency, 'symbol' | 'name'>
  )> }
);

export type GetDividendsQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetDividendsQuery = (
  { __typename?: 'query_root' }
  & { Dividend: Array<(
    { __typename?: 'Dividend' }
    & dividendFragment
  )> }
);

export type CreateDividendMutationVariables = Exact<{
  dividend: Dividend_insert_input;
  company: Company_insert_input;
}>;


export type CreateDividendMutation = (
  { __typename?: 'mutation_root' }
  & { insert_Company_one?: Maybe<(
    { __typename?: 'Company' }
    & Pick<Company, 'ticker' | 'name' | 'exchange' | 'country'>
  )>, insert_Dividend_one?: Maybe<(
    { __typename?: 'Dividend' }
    & dividendFragment
  )> }
);

export type UpdateDividendMutationVariables = Exact<{
  id: Scalars['uuid'];
  set: Dividend_set_input;
}>;


export type UpdateDividendMutation = (
  { __typename?: 'mutation_root' }
  & { update_Dividend_by_pk?: Maybe<(
    { __typename?: 'Dividend' }
    & dividendFragment
  )> }
);

export type DeleteDividendMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type DeleteDividendMutation = (
  { __typename?: 'mutation_root' }
  & { delete_Dividend_by_pk?: Maybe<(
    { __typename?: 'Dividend' }
    & dividendFragment
  )> }
);

export const DividendFragmentDoc = gql`
    fragment dividend on Dividend {
  id
  company {
    ticker
    name
    exchange
    country
  }
  currency {
    symbol
    name
  }
  amount_pretax
  amount_posttax
  date
}
    `;
export const GetDividendsDoc = gql`
    query GetDividends($userId: String!) {
  Dividend(where: {user_id: {_eq: $userId}}) {
    ...dividend
  }
}
    ${DividendFragmentDoc}`;
export const CreateDividendDoc = gql`
    mutation CreateDividend($dividend: Dividend_insert_input!, $company: Company_insert_input!) {
  insert_Company_one(
    object: $company
    on_conflict: {constraint: Company_pkey, update_columns: []}
  ) {
    ticker
    name
    exchange
    country
  }
  insert_Dividend_one(object: $dividend) {
    ...dividend
  }
}
    ${DividendFragmentDoc}`;
export const UpdateDividendDoc = gql`
    mutation UpdateDividend($id: uuid!, $set: Dividend_set_input!) {
  update_Dividend_by_pk(pk_columns: {id: $id}, _set: $set) {
    ...dividend
  }
}
    ${DividendFragmentDoc}`;
export const DeleteDividendDoc = gql`
    mutation DeleteDividend($id: uuid!) {
  delete_Dividend_by_pk(id: $id) {
    ...dividend
  }
}
    ${DividendFragmentDoc}`;
export const GetDividends = ( variables: GetDividendsQueryVariables ) =>
  query<GetDividendsQuery, GetDividendsQueryVariables>(GetDividendsDoc ,{
    variables
  })

export const CreateDividend = (  ) =>
  mutation<CreateDividendMutation, CreateDividendMutationVariables>(CreateDividendDoc)

export const UpdateDividend = (  ) =>
  mutation<UpdateDividendMutation, UpdateDividendMutationVariables>(UpdateDividendDoc)

export const DeleteDividend = (  ) =>
  mutation<DeleteDividendMutation, DeleteDividendMutationVariables>(DeleteDividendDoc)
