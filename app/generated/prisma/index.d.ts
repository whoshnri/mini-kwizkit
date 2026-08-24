
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model LoginSession
 * 
 */
export type LoginSession = $Result.DefaultSelection<Prisma.$LoginSessionPayload>
/**
 * Model Student
 * 
 */
export type Student = $Result.DefaultSelection<Prisma.$StudentPayload>
/**
 * Model Test
 * 
 */
export type Test = $Result.DefaultSelection<Prisma.$TestPayload>
/**
 * Model LiveTestAttempt
 * 
 */
export type LiveTestAttempt = $Result.DefaultSelection<Prisma.$LiveTestAttemptPayload>
/**
 * Model LiveProctorFlag
 * 
 */
export type LiveProctorFlag = $Result.DefaultSelection<Prisma.$LiveProctorFlagPayload>
/**
 * Model Question
 * 
 */
export type Question = $Result.DefaultSelection<Prisma.$QuestionPayload>
/**
 * Model TestScore
 * 
 */
export type TestScore = $Result.DefaultSelection<Prisma.$TestScorePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Gender: {
  male: 'male',
  female: 'female',
  other: 'other'
};

export type Gender = (typeof Gender)[keyof typeof Gender]


export const Difficulty: {
  easy: 'easy',
  medium: 'medium',
  hard: 'hard'
};

export type Difficulty = (typeof Difficulty)[keyof typeof Difficulty]


export const QuestionType: {
  multiple_choice: 'multiple_choice',
  short_answer: 'short_answer',
  essay: 'essay',
  true_or_false: 'true_or_false'
};

export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType]

}

export type Gender = $Enums.Gender

export const Gender: typeof $Enums.Gender

export type Difficulty = $Enums.Difficulty

export const Difficulty: typeof $Enums.Difficulty

export type QuestionType = $Enums.QuestionType

export const QuestionType: typeof $Enums.QuestionType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.loginSession`: Exposes CRUD operations for the **LoginSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LoginSessions
    * const loginSessions = await prisma.loginSession.findMany()
    * ```
    */
  get loginSession(): Prisma.LoginSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.student`: Exposes CRUD operations for the **Student** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Students
    * const students = await prisma.student.findMany()
    * ```
    */
  get student(): Prisma.StudentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.test`: Exposes CRUD operations for the **Test** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tests
    * const tests = await prisma.test.findMany()
    * ```
    */
  get test(): Prisma.TestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.liveTestAttempt`: Exposes CRUD operations for the **LiveTestAttempt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LiveTestAttempts
    * const liveTestAttempts = await prisma.liveTestAttempt.findMany()
    * ```
    */
  get liveTestAttempt(): Prisma.LiveTestAttemptDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.liveProctorFlag`: Exposes CRUD operations for the **LiveProctorFlag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LiveProctorFlags
    * const liveProctorFlags = await prisma.liveProctorFlag.findMany()
    * ```
    */
  get liveProctorFlag(): Prisma.LiveProctorFlagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.question`: Exposes CRUD operations for the **Question** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Questions
    * const questions = await prisma.question.findMany()
    * ```
    */
  get question(): Prisma.QuestionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.testScore`: Exposes CRUD operations for the **TestScore** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TestScores
    * const testScores = await prisma.testScore.findMany()
    * ```
    */
  get testScore(): Prisma.TestScoreDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.9.1
   * Query Engine version: e922089b7d7502aff4249d5da3420f6fa55fc6ad
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    LoginSession: 'LoginSession',
    Student: 'Student',
    Test: 'Test',
    LiveTestAttempt: 'LiveTestAttempt',
    LiveProctorFlag: 'LiveProctorFlag',
    Question: 'Question',
    TestScore: 'TestScore'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "loginSession" | "student" | "test" | "liveTestAttempt" | "liveProctorFlag" | "question" | "testScore"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      LoginSession: {
        payload: Prisma.$LoginSessionPayload<ExtArgs>
        fields: Prisma.LoginSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LoginSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoginSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LoginSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoginSessionPayload>
          }
          findFirst: {
            args: Prisma.LoginSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoginSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LoginSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoginSessionPayload>
          }
          findMany: {
            args: Prisma.LoginSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoginSessionPayload>[]
          }
          create: {
            args: Prisma.LoginSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoginSessionPayload>
          }
          createMany: {
            args: Prisma.LoginSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LoginSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoginSessionPayload>[]
          }
          delete: {
            args: Prisma.LoginSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoginSessionPayload>
          }
          update: {
            args: Prisma.LoginSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoginSessionPayload>
          }
          deleteMany: {
            args: Prisma.LoginSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LoginSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LoginSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoginSessionPayload>[]
          }
          upsert: {
            args: Prisma.LoginSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoginSessionPayload>
          }
          aggregate: {
            args: Prisma.LoginSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLoginSession>
          }
          groupBy: {
            args: Prisma.LoginSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<LoginSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.LoginSessionCountArgs<ExtArgs>
            result: $Utils.Optional<LoginSessionCountAggregateOutputType> | number
          }
        }
      }
      Student: {
        payload: Prisma.$StudentPayload<ExtArgs>
        fields: Prisma.StudentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findFirst: {
            args: Prisma.StudentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findMany: {
            args: Prisma.StudentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          create: {
            args: Prisma.StudentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          createMany: {
            args: Prisma.StudentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          delete: {
            args: Prisma.StudentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          update: {
            args: Prisma.StudentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          deleteMany: {
            args: Prisma.StudentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StudentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          upsert: {
            args: Prisma.StudentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          aggregate: {
            args: Prisma.StudentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudent>
          }
          groupBy: {
            args: Prisma.StudentGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentCountArgs<ExtArgs>
            result: $Utils.Optional<StudentCountAggregateOutputType> | number
          }
        }
      }
      Test: {
        payload: Prisma.$TestPayload<ExtArgs>
        fields: Prisma.TestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>
          }
          findFirst: {
            args: Prisma.TestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>
          }
          findMany: {
            args: Prisma.TestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>[]
          }
          create: {
            args: Prisma.TestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>
          }
          createMany: {
            args: Prisma.TestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>[]
          }
          delete: {
            args: Prisma.TestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>
          }
          update: {
            args: Prisma.TestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>
          }
          deleteMany: {
            args: Prisma.TestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>[]
          }
          upsert: {
            args: Prisma.TestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>
          }
          aggregate: {
            args: Prisma.TestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTest>
          }
          groupBy: {
            args: Prisma.TestGroupByArgs<ExtArgs>
            result: $Utils.Optional<TestGroupByOutputType>[]
          }
          count: {
            args: Prisma.TestCountArgs<ExtArgs>
            result: $Utils.Optional<TestCountAggregateOutputType> | number
          }
        }
      }
      LiveTestAttempt: {
        payload: Prisma.$LiveTestAttemptPayload<ExtArgs>
        fields: Prisma.LiveTestAttemptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LiveTestAttemptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveTestAttemptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LiveTestAttemptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveTestAttemptPayload>
          }
          findFirst: {
            args: Prisma.LiveTestAttemptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveTestAttemptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LiveTestAttemptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveTestAttemptPayload>
          }
          findMany: {
            args: Prisma.LiveTestAttemptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveTestAttemptPayload>[]
          }
          create: {
            args: Prisma.LiveTestAttemptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveTestAttemptPayload>
          }
          createMany: {
            args: Prisma.LiveTestAttemptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LiveTestAttemptCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveTestAttemptPayload>[]
          }
          delete: {
            args: Prisma.LiveTestAttemptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveTestAttemptPayload>
          }
          update: {
            args: Prisma.LiveTestAttemptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveTestAttemptPayload>
          }
          deleteMany: {
            args: Prisma.LiveTestAttemptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LiveTestAttemptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LiveTestAttemptUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveTestAttemptPayload>[]
          }
          upsert: {
            args: Prisma.LiveTestAttemptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveTestAttemptPayload>
          }
          aggregate: {
            args: Prisma.LiveTestAttemptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLiveTestAttempt>
          }
          groupBy: {
            args: Prisma.LiveTestAttemptGroupByArgs<ExtArgs>
            result: $Utils.Optional<LiveTestAttemptGroupByOutputType>[]
          }
          count: {
            args: Prisma.LiveTestAttemptCountArgs<ExtArgs>
            result: $Utils.Optional<LiveTestAttemptCountAggregateOutputType> | number
          }
        }
      }
      LiveProctorFlag: {
        payload: Prisma.$LiveProctorFlagPayload<ExtArgs>
        fields: Prisma.LiveProctorFlagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LiveProctorFlagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveProctorFlagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LiveProctorFlagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveProctorFlagPayload>
          }
          findFirst: {
            args: Prisma.LiveProctorFlagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveProctorFlagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LiveProctorFlagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveProctorFlagPayload>
          }
          findMany: {
            args: Prisma.LiveProctorFlagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveProctorFlagPayload>[]
          }
          create: {
            args: Prisma.LiveProctorFlagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveProctorFlagPayload>
          }
          createMany: {
            args: Prisma.LiveProctorFlagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LiveProctorFlagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveProctorFlagPayload>[]
          }
          delete: {
            args: Prisma.LiveProctorFlagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveProctorFlagPayload>
          }
          update: {
            args: Prisma.LiveProctorFlagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveProctorFlagPayload>
          }
          deleteMany: {
            args: Prisma.LiveProctorFlagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LiveProctorFlagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LiveProctorFlagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveProctorFlagPayload>[]
          }
          upsert: {
            args: Prisma.LiveProctorFlagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveProctorFlagPayload>
          }
          aggregate: {
            args: Prisma.LiveProctorFlagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLiveProctorFlag>
          }
          groupBy: {
            args: Prisma.LiveProctorFlagGroupByArgs<ExtArgs>
            result: $Utils.Optional<LiveProctorFlagGroupByOutputType>[]
          }
          count: {
            args: Prisma.LiveProctorFlagCountArgs<ExtArgs>
            result: $Utils.Optional<LiveProctorFlagCountAggregateOutputType> | number
          }
        }
      }
      Question: {
        payload: Prisma.$QuestionPayload<ExtArgs>
        fields: Prisma.QuestionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuestionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuestionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          findFirst: {
            args: Prisma.QuestionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuestionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          findMany: {
            args: Prisma.QuestionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>[]
          }
          create: {
            args: Prisma.QuestionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          createMany: {
            args: Prisma.QuestionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuestionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>[]
          }
          delete: {
            args: Prisma.QuestionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          update: {
            args: Prisma.QuestionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          deleteMany: {
            args: Prisma.QuestionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuestionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QuestionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>[]
          }
          upsert: {
            args: Prisma.QuestionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          aggregate: {
            args: Prisma.QuestionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuestion>
          }
          groupBy: {
            args: Prisma.QuestionGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuestionGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuestionCountArgs<ExtArgs>
            result: $Utils.Optional<QuestionCountAggregateOutputType> | number
          }
        }
      }
      TestScore: {
        payload: Prisma.$TestScorePayload<ExtArgs>
        fields: Prisma.TestScoreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TestScoreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestScorePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TestScoreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestScorePayload>
          }
          findFirst: {
            args: Prisma.TestScoreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestScorePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TestScoreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestScorePayload>
          }
          findMany: {
            args: Prisma.TestScoreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestScorePayload>[]
          }
          create: {
            args: Prisma.TestScoreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestScorePayload>
          }
          createMany: {
            args: Prisma.TestScoreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TestScoreCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestScorePayload>[]
          }
          delete: {
            args: Prisma.TestScoreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestScorePayload>
          }
          update: {
            args: Prisma.TestScoreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestScorePayload>
          }
          deleteMany: {
            args: Prisma.TestScoreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TestScoreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TestScoreUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestScorePayload>[]
          }
          upsert: {
            args: Prisma.TestScoreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestScorePayload>
          }
          aggregate: {
            args: Prisma.TestScoreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTestScore>
          }
          groupBy: {
            args: Prisma.TestScoreGroupByArgs<ExtArgs>
            result: $Utils.Optional<TestScoreGroupByOutputType>[]
          }
          count: {
            args: Prisma.TestScoreCountArgs<ExtArgs>
            result: $Utils.Optional<TestScoreCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    loginSession?: LoginSessionOmit
    student?: StudentOmit
    test?: TestOmit
    liveTestAttempt?: LiveTestAttemptOmit
    liveProctorFlag?: LiveProctorFlagOmit
    question?: QuestionOmit
    testScore?: TestScoreOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    tests: number
    studentsCreated: number
    proctorFlags: number
    sessions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tests?: boolean | UserCountOutputTypeCountTestsArgs
    studentsCreated?: boolean | UserCountOutputTypeCountStudentsCreatedArgs
    proctorFlags?: boolean | UserCountOutputTypeCountProctorFlagsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountStudentsCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProctorFlagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LiveProctorFlagWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoginSessionWhereInput
  }


  /**
   * Count Type StudentCountOutputType
   */

  export type StudentCountOutputType = {
    testScores: number
    liveAttempts: number
    proctorFlags: number
  }

  export type StudentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    testScores?: boolean | StudentCountOutputTypeCountTestScoresArgs
    liveAttempts?: boolean | StudentCountOutputTypeCountLiveAttemptsArgs
    proctorFlags?: boolean | StudentCountOutputTypeCountProctorFlagsArgs
  }

  // Custom InputTypes
  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCountOutputType
     */
    select?: StudentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountTestScoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestScoreWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountLiveAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LiveTestAttemptWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountProctorFlagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LiveProctorFlagWhereInput
  }


  /**
   * Count Type TestCountOutputType
   */

  export type TestCountOutputType = {
    questions: number
    testScores: number
    liveAttempts: number
    proctorFlags: number
  }

  export type TestCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    questions?: boolean | TestCountOutputTypeCountQuestionsArgs
    testScores?: boolean | TestCountOutputTypeCountTestScoresArgs
    liveAttempts?: boolean | TestCountOutputTypeCountLiveAttemptsArgs
    proctorFlags?: boolean | TestCountOutputTypeCountProctorFlagsArgs
  }

  // Custom InputTypes
  /**
   * TestCountOutputType without action
   */
  export type TestCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCountOutputType
     */
    select?: TestCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TestCountOutputType without action
   */
  export type TestCountOutputTypeCountQuestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionWhereInput
  }

  /**
   * TestCountOutputType without action
   */
  export type TestCountOutputTypeCountTestScoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestScoreWhereInput
  }

  /**
   * TestCountOutputType without action
   */
  export type TestCountOutputTypeCountLiveAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LiveTestAttemptWhereInput
  }

  /**
   * TestCountOutputType without action
   */
  export type TestCountOutputTypeCountProctorFlagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LiveProctorFlagWhereInput
  }


  /**
   * Count Type LiveTestAttemptCountOutputType
   */

  export type LiveTestAttemptCountOutputType = {
    proctorFlags: number
  }

  export type LiveTestAttemptCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    proctorFlags?: boolean | LiveTestAttemptCountOutputTypeCountProctorFlagsArgs
  }

  // Custom InputTypes
  /**
   * LiveTestAttemptCountOutputType without action
   */
  export type LiveTestAttemptCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveTestAttemptCountOutputType
     */
    select?: LiveTestAttemptCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LiveTestAttemptCountOutputType without action
   */
  export type LiveTestAttemptCountOutputTypeCountProctorFlagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LiveProctorFlagWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    username: string | null
    passwordHash: string | null
    uniqueId: string | null
    image: string | null
    gender: $Enums.Gender | null
    phone: string | null
    city: string | null
    accountId: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    username: string | null
    passwordHash: string | null
    uniqueId: string | null
    image: string | null
    gender: $Enums.Gender | null
    phone: string | null
    city: string | null
    accountId: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    email: number
    username: number
    passwordHash: number
    uniqueId: number
    image: number
    gender: number
    phone: number
    city: number
    accountId: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    username?: true
    passwordHash?: true
    uniqueId?: true
    image?: true
    gender?: true
    phone?: true
    city?: true
    accountId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    username?: true
    passwordHash?: true
    uniqueId?: true
    image?: true
    gender?: true
    phone?: true
    city?: true
    accountId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    username?: true
    passwordHash?: true
    uniqueId?: true
    image?: true
    gender?: true
    phone?: true
    city?: true
    accountId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    firstName: string | null
    lastName: string | null
    email: string | null
    username: string | null
    passwordHash: string | null
    uniqueId: string | null
    image: string | null
    gender: $Enums.Gender
    phone: string | null
    city: string | null
    accountId: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    username?: boolean
    passwordHash?: boolean
    uniqueId?: boolean
    image?: boolean
    gender?: boolean
    phone?: boolean
    city?: boolean
    accountId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tests?: boolean | User$testsArgs<ExtArgs>
    studentsCreated?: boolean | User$studentsCreatedArgs<ExtArgs>
    proctorFlags?: boolean | User$proctorFlagsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    username?: boolean
    passwordHash?: boolean
    uniqueId?: boolean
    image?: boolean
    gender?: boolean
    phone?: boolean
    city?: boolean
    accountId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    username?: boolean
    passwordHash?: boolean
    uniqueId?: boolean
    image?: boolean
    gender?: boolean
    phone?: boolean
    city?: boolean
    accountId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    username?: boolean
    passwordHash?: boolean
    uniqueId?: boolean
    image?: boolean
    gender?: boolean
    phone?: boolean
    city?: boolean
    accountId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "email" | "username" | "passwordHash" | "uniqueId" | "image" | "gender" | "phone" | "city" | "accountId" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tests?: boolean | User$testsArgs<ExtArgs>
    studentsCreated?: boolean | User$studentsCreatedArgs<ExtArgs>
    proctorFlags?: boolean | User$proctorFlagsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      tests: Prisma.$TestPayload<ExtArgs>[]
      studentsCreated: Prisma.$StudentPayload<ExtArgs>[]
      proctorFlags: Prisma.$LiveProctorFlagPayload<ExtArgs>[]
      sessions: Prisma.$LoginSessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string | null
      lastName: string | null
      email: string | null
      username: string | null
      passwordHash: string | null
      uniqueId: string | null
      image: string | null
      gender: $Enums.Gender
      phone: string | null
      city: string | null
      accountId: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tests<T extends User$testsArgs<ExtArgs> = {}>(args?: Subset<T, User$testsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    studentsCreated<T extends User$studentsCreatedArgs<ExtArgs> = {}>(args?: Subset<T, User$studentsCreatedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    proctorFlags<T extends User$proctorFlagsArgs<ExtArgs> = {}>(args?: Subset<T, User$proctorFlagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LiveProctorFlagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoginSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly uniqueId: FieldRef<"User", 'String'>
    readonly image: FieldRef<"User", 'String'>
    readonly gender: FieldRef<"User", 'Gender'>
    readonly phone: FieldRef<"User", 'String'>
    readonly city: FieldRef<"User", 'String'>
    readonly accountId: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.tests
   */
  export type User$testsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    where?: TestWhereInput
    orderBy?: TestOrderByWithRelationInput | TestOrderByWithRelationInput[]
    cursor?: TestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TestScalarFieldEnum | TestScalarFieldEnum[]
  }

  /**
   * User.studentsCreated
   */
  export type User$studentsCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    cursor?: StudentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * User.proctorFlags
   */
  export type User$proctorFlagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveProctorFlag
     */
    select?: LiveProctorFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveProctorFlag
     */
    omit?: LiveProctorFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveProctorFlagInclude<ExtArgs> | null
    where?: LiveProctorFlagWhereInput
    orderBy?: LiveProctorFlagOrderByWithRelationInput | LiveProctorFlagOrderByWithRelationInput[]
    cursor?: LiveProctorFlagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LiveProctorFlagScalarFieldEnum | LiveProctorFlagScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginSession
     */
    select?: LoginSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoginSession
     */
    omit?: LoginSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoginSessionInclude<ExtArgs> | null
    where?: LoginSessionWhereInput
    orderBy?: LoginSessionOrderByWithRelationInput | LoginSessionOrderByWithRelationInput[]
    cursor?: LoginSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LoginSessionScalarFieldEnum | LoginSessionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model LoginSession
   */

  export type AggregateLoginSession = {
    _count: LoginSessionCountAggregateOutputType | null
    _min: LoginSessionMinAggregateOutputType | null
    _max: LoginSessionMaxAggregateOutputType | null
  }

  export type LoginSessionMinAggregateOutputType = {
    id: string | null
    token: string | null
    expiresAt: Date | null
    createdAt: Date | null
    userId: string | null
  }

  export type LoginSessionMaxAggregateOutputType = {
    id: string | null
    token: string | null
    expiresAt: Date | null
    createdAt: Date | null
    userId: string | null
  }

  export type LoginSessionCountAggregateOutputType = {
    id: number
    token: number
    expiresAt: number
    createdAt: number
    userId: number
    _all: number
  }


  export type LoginSessionMinAggregateInputType = {
    id?: true
    token?: true
    expiresAt?: true
    createdAt?: true
    userId?: true
  }

  export type LoginSessionMaxAggregateInputType = {
    id?: true
    token?: true
    expiresAt?: true
    createdAt?: true
    userId?: true
  }

  export type LoginSessionCountAggregateInputType = {
    id?: true
    token?: true
    expiresAt?: true
    createdAt?: true
    userId?: true
    _all?: true
  }

  export type LoginSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoginSession to aggregate.
     */
    where?: LoginSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoginSessions to fetch.
     */
    orderBy?: LoginSessionOrderByWithRelationInput | LoginSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LoginSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoginSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoginSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LoginSessions
    **/
    _count?: true | LoginSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LoginSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LoginSessionMaxAggregateInputType
  }

  export type GetLoginSessionAggregateType<T extends LoginSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateLoginSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLoginSession[P]>
      : GetScalarType<T[P], AggregateLoginSession[P]>
  }




  export type LoginSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoginSessionWhereInput
    orderBy?: LoginSessionOrderByWithAggregationInput | LoginSessionOrderByWithAggregationInput[]
    by: LoginSessionScalarFieldEnum[] | LoginSessionScalarFieldEnum
    having?: LoginSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LoginSessionCountAggregateInputType | true
    _min?: LoginSessionMinAggregateInputType
    _max?: LoginSessionMaxAggregateInputType
  }

  export type LoginSessionGroupByOutputType = {
    id: string
    token: string
    expiresAt: Date
    createdAt: Date
    userId: string
    _count: LoginSessionCountAggregateOutputType | null
    _min: LoginSessionMinAggregateOutputType | null
    _max: LoginSessionMaxAggregateOutputType | null
  }

  type GetLoginSessionGroupByPayload<T extends LoginSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LoginSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LoginSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LoginSessionGroupByOutputType[P]>
            : GetScalarType<T[P], LoginSessionGroupByOutputType[P]>
        }
      >
    >


  export type LoginSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loginSession"]>

  export type LoginSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loginSession"]>

  export type LoginSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loginSession"]>

  export type LoginSessionSelectScalar = {
    id?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    userId?: boolean
  }

  export type LoginSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "token" | "expiresAt" | "createdAt" | "userId", ExtArgs["result"]["loginSession"]>
  export type LoginSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LoginSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LoginSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $LoginSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LoginSession"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      token: string
      expiresAt: Date
      createdAt: Date
      userId: string
    }, ExtArgs["result"]["loginSession"]>
    composites: {}
  }

  type LoginSessionGetPayload<S extends boolean | null | undefined | LoginSessionDefaultArgs> = $Result.GetResult<Prisma.$LoginSessionPayload, S>

  type LoginSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LoginSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LoginSessionCountAggregateInputType | true
    }

  export interface LoginSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LoginSession'], meta: { name: 'LoginSession' } }
    /**
     * Find zero or one LoginSession that matches the filter.
     * @param {LoginSessionFindUniqueArgs} args - Arguments to find a LoginSession
     * @example
     * // Get one LoginSession
     * const loginSession = await prisma.loginSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LoginSessionFindUniqueArgs>(args: SelectSubset<T, LoginSessionFindUniqueArgs<ExtArgs>>): Prisma__LoginSessionClient<$Result.GetResult<Prisma.$LoginSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LoginSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LoginSessionFindUniqueOrThrowArgs} args - Arguments to find a LoginSession
     * @example
     * // Get one LoginSession
     * const loginSession = await prisma.loginSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LoginSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, LoginSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LoginSessionClient<$Result.GetResult<Prisma.$LoginSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoginSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginSessionFindFirstArgs} args - Arguments to find a LoginSession
     * @example
     * // Get one LoginSession
     * const loginSession = await prisma.loginSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LoginSessionFindFirstArgs>(args?: SelectSubset<T, LoginSessionFindFirstArgs<ExtArgs>>): Prisma__LoginSessionClient<$Result.GetResult<Prisma.$LoginSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoginSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginSessionFindFirstOrThrowArgs} args - Arguments to find a LoginSession
     * @example
     * // Get one LoginSession
     * const loginSession = await prisma.loginSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LoginSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, LoginSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__LoginSessionClient<$Result.GetResult<Prisma.$LoginSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LoginSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LoginSessions
     * const loginSessions = await prisma.loginSession.findMany()
     * 
     * // Get first 10 LoginSessions
     * const loginSessions = await prisma.loginSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const loginSessionWithIdOnly = await prisma.loginSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LoginSessionFindManyArgs>(args?: SelectSubset<T, LoginSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoginSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LoginSession.
     * @param {LoginSessionCreateArgs} args - Arguments to create a LoginSession.
     * @example
     * // Create one LoginSession
     * const LoginSession = await prisma.loginSession.create({
     *   data: {
     *     // ... data to create a LoginSession
     *   }
     * })
     * 
     */
    create<T extends LoginSessionCreateArgs>(args: SelectSubset<T, LoginSessionCreateArgs<ExtArgs>>): Prisma__LoginSessionClient<$Result.GetResult<Prisma.$LoginSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LoginSessions.
     * @param {LoginSessionCreateManyArgs} args - Arguments to create many LoginSessions.
     * @example
     * // Create many LoginSessions
     * const loginSession = await prisma.loginSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LoginSessionCreateManyArgs>(args?: SelectSubset<T, LoginSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LoginSessions and returns the data saved in the database.
     * @param {LoginSessionCreateManyAndReturnArgs} args - Arguments to create many LoginSessions.
     * @example
     * // Create many LoginSessions
     * const loginSession = await prisma.loginSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LoginSessions and only return the `id`
     * const loginSessionWithIdOnly = await prisma.loginSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LoginSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, LoginSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoginSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LoginSession.
     * @param {LoginSessionDeleteArgs} args - Arguments to delete one LoginSession.
     * @example
     * // Delete one LoginSession
     * const LoginSession = await prisma.loginSession.delete({
     *   where: {
     *     // ... filter to delete one LoginSession
     *   }
     * })
     * 
     */
    delete<T extends LoginSessionDeleteArgs>(args: SelectSubset<T, LoginSessionDeleteArgs<ExtArgs>>): Prisma__LoginSessionClient<$Result.GetResult<Prisma.$LoginSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LoginSession.
     * @param {LoginSessionUpdateArgs} args - Arguments to update one LoginSession.
     * @example
     * // Update one LoginSession
     * const loginSession = await prisma.loginSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LoginSessionUpdateArgs>(args: SelectSubset<T, LoginSessionUpdateArgs<ExtArgs>>): Prisma__LoginSessionClient<$Result.GetResult<Prisma.$LoginSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LoginSessions.
     * @param {LoginSessionDeleteManyArgs} args - Arguments to filter LoginSessions to delete.
     * @example
     * // Delete a few LoginSessions
     * const { count } = await prisma.loginSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LoginSessionDeleteManyArgs>(args?: SelectSubset<T, LoginSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoginSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LoginSessions
     * const loginSession = await prisma.loginSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LoginSessionUpdateManyArgs>(args: SelectSubset<T, LoginSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoginSessions and returns the data updated in the database.
     * @param {LoginSessionUpdateManyAndReturnArgs} args - Arguments to update many LoginSessions.
     * @example
     * // Update many LoginSessions
     * const loginSession = await prisma.loginSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LoginSessions and only return the `id`
     * const loginSessionWithIdOnly = await prisma.loginSession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LoginSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, LoginSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoginSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LoginSession.
     * @param {LoginSessionUpsertArgs} args - Arguments to update or create a LoginSession.
     * @example
     * // Update or create a LoginSession
     * const loginSession = await prisma.loginSession.upsert({
     *   create: {
     *     // ... data to create a LoginSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LoginSession we want to update
     *   }
     * })
     */
    upsert<T extends LoginSessionUpsertArgs>(args: SelectSubset<T, LoginSessionUpsertArgs<ExtArgs>>): Prisma__LoginSessionClient<$Result.GetResult<Prisma.$LoginSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LoginSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginSessionCountArgs} args - Arguments to filter LoginSessions to count.
     * @example
     * // Count the number of LoginSessions
     * const count = await prisma.loginSession.count({
     *   where: {
     *     // ... the filter for the LoginSessions we want to count
     *   }
     * })
    **/
    count<T extends LoginSessionCountArgs>(
      args?: Subset<T, LoginSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LoginSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LoginSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LoginSessionAggregateArgs>(args: Subset<T, LoginSessionAggregateArgs>): Prisma.PrismaPromise<GetLoginSessionAggregateType<T>>

    /**
     * Group by LoginSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoginSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LoginSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LoginSessionGroupByArgs['orderBy'] }
        : { orderBy?: LoginSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LoginSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoginSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LoginSession model
   */
  readonly fields: LoginSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LoginSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LoginSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LoginSession model
   */
  interface LoginSessionFieldRefs {
    readonly id: FieldRef<"LoginSession", 'String'>
    readonly token: FieldRef<"LoginSession", 'String'>
    readonly expiresAt: FieldRef<"LoginSession", 'DateTime'>
    readonly createdAt: FieldRef<"LoginSession", 'DateTime'>
    readonly userId: FieldRef<"LoginSession", 'String'>
  }
    

  // Custom InputTypes
  /**
   * LoginSession findUnique
   */
  export type LoginSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginSession
     */
    select?: LoginSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoginSession
     */
    omit?: LoginSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoginSessionInclude<ExtArgs> | null
    /**
     * Filter, which LoginSession to fetch.
     */
    where: LoginSessionWhereUniqueInput
  }

  /**
   * LoginSession findUniqueOrThrow
   */
  export type LoginSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginSession
     */
    select?: LoginSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoginSession
     */
    omit?: LoginSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoginSessionInclude<ExtArgs> | null
    /**
     * Filter, which LoginSession to fetch.
     */
    where: LoginSessionWhereUniqueInput
  }

  /**
   * LoginSession findFirst
   */
  export type LoginSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginSession
     */
    select?: LoginSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoginSession
     */
    omit?: LoginSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoginSessionInclude<ExtArgs> | null
    /**
     * Filter, which LoginSession to fetch.
     */
    where?: LoginSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoginSessions to fetch.
     */
    orderBy?: LoginSessionOrderByWithRelationInput | LoginSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoginSessions.
     */
    cursor?: LoginSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoginSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoginSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoginSessions.
     */
    distinct?: LoginSessionScalarFieldEnum | LoginSessionScalarFieldEnum[]
  }

  /**
   * LoginSession findFirstOrThrow
   */
  export type LoginSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginSession
     */
    select?: LoginSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoginSession
     */
    omit?: LoginSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoginSessionInclude<ExtArgs> | null
    /**
     * Filter, which LoginSession to fetch.
     */
    where?: LoginSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoginSessions to fetch.
     */
    orderBy?: LoginSessionOrderByWithRelationInput | LoginSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoginSessions.
     */
    cursor?: LoginSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoginSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoginSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoginSessions.
     */
    distinct?: LoginSessionScalarFieldEnum | LoginSessionScalarFieldEnum[]
  }

  /**
   * LoginSession findMany
   */
  export type LoginSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginSession
     */
    select?: LoginSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoginSession
     */
    omit?: LoginSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoginSessionInclude<ExtArgs> | null
    /**
     * Filter, which LoginSessions to fetch.
     */
    where?: LoginSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoginSessions to fetch.
     */
    orderBy?: LoginSessionOrderByWithRelationInput | LoginSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LoginSessions.
     */
    cursor?: LoginSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoginSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoginSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoginSessions.
     */
    distinct?: LoginSessionScalarFieldEnum | LoginSessionScalarFieldEnum[]
  }

  /**
   * LoginSession create
   */
  export type LoginSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginSession
     */
    select?: LoginSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoginSession
     */
    omit?: LoginSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoginSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a LoginSession.
     */
    data: XOR<LoginSessionCreateInput, LoginSessionUncheckedCreateInput>
  }

  /**
   * LoginSession createMany
   */
  export type LoginSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LoginSessions.
     */
    data: LoginSessionCreateManyInput | LoginSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LoginSession createManyAndReturn
   */
  export type LoginSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginSession
     */
    select?: LoginSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoginSession
     */
    omit?: LoginSessionOmit<ExtArgs> | null
    /**
     * The data used to create many LoginSessions.
     */
    data: LoginSessionCreateManyInput | LoginSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoginSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LoginSession update
   */
  export type LoginSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginSession
     */
    select?: LoginSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoginSession
     */
    omit?: LoginSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoginSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a LoginSession.
     */
    data: XOR<LoginSessionUpdateInput, LoginSessionUncheckedUpdateInput>
    /**
     * Choose, which LoginSession to update.
     */
    where: LoginSessionWhereUniqueInput
  }

  /**
   * LoginSession updateMany
   */
  export type LoginSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LoginSessions.
     */
    data: XOR<LoginSessionUpdateManyMutationInput, LoginSessionUncheckedUpdateManyInput>
    /**
     * Filter which LoginSessions to update
     */
    where?: LoginSessionWhereInput
    /**
     * Limit how many LoginSessions to update.
     */
    limit?: number
  }

  /**
   * LoginSession updateManyAndReturn
   */
  export type LoginSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginSession
     */
    select?: LoginSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoginSession
     */
    omit?: LoginSessionOmit<ExtArgs> | null
    /**
     * The data used to update LoginSessions.
     */
    data: XOR<LoginSessionUpdateManyMutationInput, LoginSessionUncheckedUpdateManyInput>
    /**
     * Filter which LoginSessions to update
     */
    where?: LoginSessionWhereInput
    /**
     * Limit how many LoginSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoginSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LoginSession upsert
   */
  export type LoginSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginSession
     */
    select?: LoginSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoginSession
     */
    omit?: LoginSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoginSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the LoginSession to update in case it exists.
     */
    where: LoginSessionWhereUniqueInput
    /**
     * In case the LoginSession found by the `where` argument doesn't exist, create a new LoginSession with this data.
     */
    create: XOR<LoginSessionCreateInput, LoginSessionUncheckedCreateInput>
    /**
     * In case the LoginSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LoginSessionUpdateInput, LoginSessionUncheckedUpdateInput>
  }

  /**
   * LoginSession delete
   */
  export type LoginSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginSession
     */
    select?: LoginSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoginSession
     */
    omit?: LoginSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoginSessionInclude<ExtArgs> | null
    /**
     * Filter which LoginSession to delete.
     */
    where: LoginSessionWhereUniqueInput
  }

  /**
   * LoginSession deleteMany
   */
  export type LoginSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoginSessions to delete
     */
    where?: LoginSessionWhereInput
    /**
     * Limit how many LoginSessions to delete.
     */
    limit?: number
  }

  /**
   * LoginSession without action
   */
  export type LoginSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoginSession
     */
    select?: LoginSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoginSession
     */
    omit?: LoginSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoginSessionInclude<ExtArgs> | null
  }


  /**
   * Model Student
   */

  export type AggregateStudent = {
    _count: StudentCountAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  export type StudentMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StudentMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StudentCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    email: number
    createdById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StudentMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StudentMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StudentCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StudentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Student to aggregate.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Students
    **/
    _count?: true | StudentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentMaxAggregateInputType
  }

  export type GetStudentAggregateType<T extends StudentAggregateArgs> = {
        [P in keyof T & keyof AggregateStudent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudent[P]>
      : GetScalarType<T[P], AggregateStudent[P]>
  }




  export type StudentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithAggregationInput | StudentOrderByWithAggregationInput[]
    by: StudentScalarFieldEnum[] | StudentScalarFieldEnum
    having?: StudentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentCountAggregateInputType | true
    _min?: StudentMinAggregateInputType
    _max?: StudentMaxAggregateInputType
  }

  export type StudentGroupByOutputType = {
    id: string
    firstName: string
    lastName: string
    email: string
    createdById: string
    createdAt: Date
    updatedAt: Date
    _count: StudentCountAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  type GetStudentGroupByPayload<T extends StudentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentGroupByOutputType[P]>
            : GetScalarType<T[P], StudentGroupByOutputType[P]>
        }
      >
    >


  export type StudentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    testScores?: boolean | Student$testScoresArgs<ExtArgs>
    liveAttempts?: boolean | Student$liveAttemptsArgs<ExtArgs>
    proctorFlags?: boolean | Student$proctorFlagsArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>

  export type StudentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>

  export type StudentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>

  export type StudentSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StudentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "email" | "createdById" | "createdAt" | "updatedAt", ExtArgs["result"]["student"]>
  export type StudentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    testScores?: boolean | Student$testScoresArgs<ExtArgs>
    liveAttempts?: boolean | Student$liveAttemptsArgs<ExtArgs>
    proctorFlags?: boolean | Student$proctorFlagsArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StudentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type StudentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $StudentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Student"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs>
      testScores: Prisma.$TestScorePayload<ExtArgs>[]
      liveAttempts: Prisma.$LiveTestAttemptPayload<ExtArgs>[]
      proctorFlags: Prisma.$LiveProctorFlagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string
      lastName: string
      email: string
      createdById: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["student"]>
    composites: {}
  }

  type StudentGetPayload<S extends boolean | null | undefined | StudentDefaultArgs> = $Result.GetResult<Prisma.$StudentPayload, S>

  type StudentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StudentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StudentCountAggregateInputType | true
    }

  export interface StudentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Student'], meta: { name: 'Student' } }
    /**
     * Find zero or one Student that matches the filter.
     * @param {StudentFindUniqueArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentFindUniqueArgs>(args: SelectSubset<T, StudentFindUniqueArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Student that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StudentFindUniqueOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentFindFirstArgs>(args?: SelectSubset<T, StudentFindFirstArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Students that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Students
     * const students = await prisma.student.findMany()
     * 
     * // Get first 10 Students
     * const students = await prisma.student.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studentWithIdOnly = await prisma.student.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudentFindManyArgs>(args?: SelectSubset<T, StudentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Student.
     * @param {StudentCreateArgs} args - Arguments to create a Student.
     * @example
     * // Create one Student
     * const Student = await prisma.student.create({
     *   data: {
     *     // ... data to create a Student
     *   }
     * })
     * 
     */
    create<T extends StudentCreateArgs>(args: SelectSubset<T, StudentCreateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Students.
     * @param {StudentCreateManyArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentCreateManyArgs>(args?: SelectSubset<T, StudentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Students and returns the data saved in the database.
     * @param {StudentCreateManyAndReturnArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Students and only return the `id`
     * const studentWithIdOnly = await prisma.student.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Student.
     * @param {StudentDeleteArgs} args - Arguments to delete one Student.
     * @example
     * // Delete one Student
     * const Student = await prisma.student.delete({
     *   where: {
     *     // ... filter to delete one Student
     *   }
     * })
     * 
     */
    delete<T extends StudentDeleteArgs>(args: SelectSubset<T, StudentDeleteArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Student.
     * @param {StudentUpdateArgs} args - Arguments to update one Student.
     * @example
     * // Update one Student
     * const student = await prisma.student.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentUpdateArgs>(args: SelectSubset<T, StudentUpdateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Students.
     * @param {StudentDeleteManyArgs} args - Arguments to filter Students to delete.
     * @example
     * // Delete a few Students
     * const { count } = await prisma.student.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentDeleteManyArgs>(args?: SelectSubset<T, StudentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentUpdateManyArgs>(args: SelectSubset<T, StudentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students and returns the data updated in the database.
     * @param {StudentUpdateManyAndReturnArgs} args - Arguments to update many Students.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Students and only return the `id`
     * const studentWithIdOnly = await prisma.student.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StudentUpdateManyAndReturnArgs>(args: SelectSubset<T, StudentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Student.
     * @param {StudentUpsertArgs} args - Arguments to update or create a Student.
     * @example
     * // Update or create a Student
     * const student = await prisma.student.upsert({
     *   create: {
     *     // ... data to create a Student
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Student we want to update
     *   }
     * })
     */
    upsert<T extends StudentUpsertArgs>(args: SelectSubset<T, StudentUpsertArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCountArgs} args - Arguments to filter Students to count.
     * @example
     * // Count the number of Students
     * const count = await prisma.student.count({
     *   where: {
     *     // ... the filter for the Students we want to count
     *   }
     * })
    **/
    count<T extends StudentCountArgs>(
      args?: Subset<T, StudentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StudentAggregateArgs>(args: Subset<T, StudentAggregateArgs>): Prisma.PrismaPromise<GetStudentAggregateType<T>>

    /**
     * Group by Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StudentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentGroupByArgs['orderBy'] }
        : { orderBy?: StudentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Student model
   */
  readonly fields: StudentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Student.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    testScores<T extends Student$testScoresArgs<ExtArgs> = {}>(args?: Subset<T, Student$testScoresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    liveAttempts<T extends Student$liveAttemptsArgs<ExtArgs> = {}>(args?: Subset<T, Student$liveAttemptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LiveTestAttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    proctorFlags<T extends Student$proctorFlagsArgs<ExtArgs> = {}>(args?: Subset<T, Student$proctorFlagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LiveProctorFlagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Student model
   */
  interface StudentFieldRefs {
    readonly id: FieldRef<"Student", 'String'>
    readonly firstName: FieldRef<"Student", 'String'>
    readonly lastName: FieldRef<"Student", 'String'>
    readonly email: FieldRef<"Student", 'String'>
    readonly createdById: FieldRef<"Student", 'String'>
    readonly createdAt: FieldRef<"Student", 'DateTime'>
    readonly updatedAt: FieldRef<"Student", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Student findUnique
   */
  export type StudentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findUniqueOrThrow
   */
  export type StudentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findFirst
   */
  export type StudentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findFirstOrThrow
   */
  export type StudentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findMany
   */
  export type StudentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Students to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student create
   */
  export type StudentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to create a Student.
     */
    data: XOR<StudentCreateInput, StudentUncheckedCreateInput>
  }

  /**
   * Student createMany
   */
  export type StudentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student createManyAndReturn
   */
  export type StudentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Student update
   */
  export type StudentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to update a Student.
     */
    data: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
    /**
     * Choose, which Student to update.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student updateMany
   */
  export type StudentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to update.
     */
    limit?: number
  }

  /**
   * Student updateManyAndReturn
   */
  export type StudentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Student upsert
   */
  export type StudentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The filter to search for the Student to update in case it exists.
     */
    where: StudentWhereUniqueInput
    /**
     * In case the Student found by the `where` argument doesn't exist, create a new Student with this data.
     */
    create: XOR<StudentCreateInput, StudentUncheckedCreateInput>
    /**
     * In case the Student was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
  }

  /**
   * Student delete
   */
  export type StudentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter which Student to delete.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student deleteMany
   */
  export type StudentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Students to delete
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to delete.
     */
    limit?: number
  }

  /**
   * Student.testScores
   */
  export type Student$testScoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
    where?: TestScoreWhereInput
    orderBy?: TestScoreOrderByWithRelationInput | TestScoreOrderByWithRelationInput[]
    cursor?: TestScoreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TestScoreScalarFieldEnum | TestScoreScalarFieldEnum[]
  }

  /**
   * Student.liveAttempts
   */
  export type Student$liveAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveTestAttempt
     */
    select?: LiveTestAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveTestAttempt
     */
    omit?: LiveTestAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveTestAttemptInclude<ExtArgs> | null
    where?: LiveTestAttemptWhereInput
    orderBy?: LiveTestAttemptOrderByWithRelationInput | LiveTestAttemptOrderByWithRelationInput[]
    cursor?: LiveTestAttemptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LiveTestAttemptScalarFieldEnum | LiveTestAttemptScalarFieldEnum[]
  }

  /**
   * Student.proctorFlags
   */
  export type Student$proctorFlagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveProctorFlag
     */
    select?: LiveProctorFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveProctorFlag
     */
    omit?: LiveProctorFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveProctorFlagInclude<ExtArgs> | null
    where?: LiveProctorFlagWhereInput
    orderBy?: LiveProctorFlagOrderByWithRelationInput | LiveProctorFlagOrderByWithRelationInput[]
    cursor?: LiveProctorFlagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LiveProctorFlagScalarFieldEnum | LiveProctorFlagScalarFieldEnum[]
  }

  /**
   * Student without action
   */
  export type StudentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
  }


  /**
   * Model Test
   */

  export type AggregateTest = {
    _count: TestCountAggregateOutputType | null
    _avg: TestAvgAggregateOutputType | null
    _sum: TestSumAggregateOutputType | null
    _min: TestMinAggregateOutputType | null
    _max: TestMaxAggregateOutputType | null
  }

  export type TestAvgAggregateOutputType = {
    totalMarks: number | null
    numberOfQuestions: number | null
    duration: number | null
  }

  export type TestSumAggregateOutputType = {
    totalMarks: number | null
    numberOfQuestions: number | null
    duration: number | null
  }

  export type TestMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    subjectName: string | null
    totalMarks: number | null
    numberOfQuestions: number | null
    difficulty: $Enums.Difficulty | null
    slug: string | null
    settings: string | null
    visibility: boolean | null
    isScheduled: boolean | null
    startTime: Date | null
    duration: number | null
    allowRetake: boolean | null
    showResults: boolean | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TestMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    subjectName: string | null
    totalMarks: number | null
    numberOfQuestions: number | null
    difficulty: $Enums.Difficulty | null
    slug: string | null
    settings: string | null
    visibility: boolean | null
    isScheduled: boolean | null
    startTime: Date | null
    duration: number | null
    allowRetake: boolean | null
    showResults: boolean | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TestCountAggregateOutputType = {
    id: number
    name: number
    description: number
    subjectName: number
    totalMarks: number
    numberOfQuestions: number
    difficulty: number
    slug: number
    settings: number
    visibility: number
    isScheduled: number
    startTime: number
    duration: number
    allowRetake: number
    showResults: number
    createdById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TestAvgAggregateInputType = {
    totalMarks?: true
    numberOfQuestions?: true
    duration?: true
  }

  export type TestSumAggregateInputType = {
    totalMarks?: true
    numberOfQuestions?: true
    duration?: true
  }

  export type TestMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    subjectName?: true
    totalMarks?: true
    numberOfQuestions?: true
    difficulty?: true
    slug?: true
    settings?: true
    visibility?: true
    isScheduled?: true
    startTime?: true
    duration?: true
    allowRetake?: true
    showResults?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TestMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    subjectName?: true
    totalMarks?: true
    numberOfQuestions?: true
    difficulty?: true
    slug?: true
    settings?: true
    visibility?: true
    isScheduled?: true
    startTime?: true
    duration?: true
    allowRetake?: true
    showResults?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TestCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    subjectName?: true
    totalMarks?: true
    numberOfQuestions?: true
    difficulty?: true
    slug?: true
    settings?: true
    visibility?: true
    isScheduled?: true
    startTime?: true
    duration?: true
    allowRetake?: true
    showResults?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Test to aggregate.
     */
    where?: TestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tests to fetch.
     */
    orderBy?: TestOrderByWithRelationInput | TestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tests
    **/
    _count?: true | TestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TestMaxAggregateInputType
  }

  export type GetTestAggregateType<T extends TestAggregateArgs> = {
        [P in keyof T & keyof AggregateTest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTest[P]>
      : GetScalarType<T[P], AggregateTest[P]>
  }




  export type TestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestWhereInput
    orderBy?: TestOrderByWithAggregationInput | TestOrderByWithAggregationInput[]
    by: TestScalarFieldEnum[] | TestScalarFieldEnum
    having?: TestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TestCountAggregateInputType | true
    _avg?: TestAvgAggregateInputType
    _sum?: TestSumAggregateInputType
    _min?: TestMinAggregateInputType
    _max?: TestMaxAggregateInputType
  }

  export type TestGroupByOutputType = {
    id: string
    name: string
    description: string | null
    subjectName: string
    totalMarks: number | null
    numberOfQuestions: number | null
    difficulty: $Enums.Difficulty
    slug: string
    settings: string
    visibility: boolean
    isScheduled: boolean
    startTime: Date | null
    duration: number | null
    allowRetake: boolean
    showResults: boolean
    createdById: string
    createdAt: Date
    updatedAt: Date
    _count: TestCountAggregateOutputType | null
    _avg: TestAvgAggregateOutputType | null
    _sum: TestSumAggregateOutputType | null
    _min: TestMinAggregateOutputType | null
    _max: TestMaxAggregateOutputType | null
  }

  type GetTestGroupByPayload<T extends TestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TestGroupByOutputType[P]>
            : GetScalarType<T[P], TestGroupByOutputType[P]>
        }
      >
    >


  export type TestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    subjectName?: boolean
    totalMarks?: boolean
    numberOfQuestions?: boolean
    difficulty?: boolean
    slug?: boolean
    settings?: boolean
    visibility?: boolean
    isScheduled?: boolean
    startTime?: boolean
    duration?: boolean
    allowRetake?: boolean
    showResults?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    questions?: boolean | Test$questionsArgs<ExtArgs>
    testScores?: boolean | Test$testScoresArgs<ExtArgs>
    liveAttempts?: boolean | Test$liveAttemptsArgs<ExtArgs>
    proctorFlags?: boolean | Test$proctorFlagsArgs<ExtArgs>
    _count?: boolean | TestCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["test"]>

  export type TestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    subjectName?: boolean
    totalMarks?: boolean
    numberOfQuestions?: boolean
    difficulty?: boolean
    slug?: boolean
    settings?: boolean
    visibility?: boolean
    isScheduled?: boolean
    startTime?: boolean
    duration?: boolean
    allowRetake?: boolean
    showResults?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["test"]>

  export type TestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    subjectName?: boolean
    totalMarks?: boolean
    numberOfQuestions?: boolean
    difficulty?: boolean
    slug?: boolean
    settings?: boolean
    visibility?: boolean
    isScheduled?: boolean
    startTime?: boolean
    duration?: boolean
    allowRetake?: boolean
    showResults?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["test"]>

  export type TestSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    subjectName?: boolean
    totalMarks?: boolean
    numberOfQuestions?: boolean
    difficulty?: boolean
    slug?: boolean
    settings?: boolean
    visibility?: boolean
    isScheduled?: boolean
    startTime?: boolean
    duration?: boolean
    allowRetake?: boolean
    showResults?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "subjectName" | "totalMarks" | "numberOfQuestions" | "difficulty" | "slug" | "settings" | "visibility" | "isScheduled" | "startTime" | "duration" | "allowRetake" | "showResults" | "createdById" | "createdAt" | "updatedAt", ExtArgs["result"]["test"]>
  export type TestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    questions?: boolean | Test$questionsArgs<ExtArgs>
    testScores?: boolean | Test$testScoresArgs<ExtArgs>
    liveAttempts?: boolean | Test$liveAttemptsArgs<ExtArgs>
    proctorFlags?: boolean | Test$proctorFlagsArgs<ExtArgs>
    _count?: boolean | TestCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Test"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs>
      questions: Prisma.$QuestionPayload<ExtArgs>[]
      testScores: Prisma.$TestScorePayload<ExtArgs>[]
      liveAttempts: Prisma.$LiveTestAttemptPayload<ExtArgs>[]
      proctorFlags: Prisma.$LiveProctorFlagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      subjectName: string
      totalMarks: number | null
      numberOfQuestions: number | null
      difficulty: $Enums.Difficulty
      slug: string
      settings: string
      visibility: boolean
      isScheduled: boolean
      startTime: Date | null
      duration: number | null
      allowRetake: boolean
      showResults: boolean
      createdById: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["test"]>
    composites: {}
  }

  type TestGetPayload<S extends boolean | null | undefined | TestDefaultArgs> = $Result.GetResult<Prisma.$TestPayload, S>

  type TestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TestCountAggregateInputType | true
    }

  export interface TestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Test'], meta: { name: 'Test' } }
    /**
     * Find zero or one Test that matches the filter.
     * @param {TestFindUniqueArgs} args - Arguments to find a Test
     * @example
     * // Get one Test
     * const test = await prisma.test.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TestFindUniqueArgs>(args: SelectSubset<T, TestFindUniqueArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Test that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TestFindUniqueOrThrowArgs} args - Arguments to find a Test
     * @example
     * // Get one Test
     * const test = await prisma.test.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TestFindUniqueOrThrowArgs>(args: SelectSubset<T, TestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Test that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestFindFirstArgs} args - Arguments to find a Test
     * @example
     * // Get one Test
     * const test = await prisma.test.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TestFindFirstArgs>(args?: SelectSubset<T, TestFindFirstArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Test that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestFindFirstOrThrowArgs} args - Arguments to find a Test
     * @example
     * // Get one Test
     * const test = await prisma.test.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TestFindFirstOrThrowArgs>(args?: SelectSubset<T, TestFindFirstOrThrowArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tests
     * const tests = await prisma.test.findMany()
     * 
     * // Get first 10 Tests
     * const tests = await prisma.test.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const testWithIdOnly = await prisma.test.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TestFindManyArgs>(args?: SelectSubset<T, TestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Test.
     * @param {TestCreateArgs} args - Arguments to create a Test.
     * @example
     * // Create one Test
     * const Test = await prisma.test.create({
     *   data: {
     *     // ... data to create a Test
     *   }
     * })
     * 
     */
    create<T extends TestCreateArgs>(args: SelectSubset<T, TestCreateArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tests.
     * @param {TestCreateManyArgs} args - Arguments to create many Tests.
     * @example
     * // Create many Tests
     * const test = await prisma.test.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TestCreateManyArgs>(args?: SelectSubset<T, TestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tests and returns the data saved in the database.
     * @param {TestCreateManyAndReturnArgs} args - Arguments to create many Tests.
     * @example
     * // Create many Tests
     * const test = await prisma.test.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tests and only return the `id`
     * const testWithIdOnly = await prisma.test.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TestCreateManyAndReturnArgs>(args?: SelectSubset<T, TestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Test.
     * @param {TestDeleteArgs} args - Arguments to delete one Test.
     * @example
     * // Delete one Test
     * const Test = await prisma.test.delete({
     *   where: {
     *     // ... filter to delete one Test
     *   }
     * })
     * 
     */
    delete<T extends TestDeleteArgs>(args: SelectSubset<T, TestDeleteArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Test.
     * @param {TestUpdateArgs} args - Arguments to update one Test.
     * @example
     * // Update one Test
     * const test = await prisma.test.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TestUpdateArgs>(args: SelectSubset<T, TestUpdateArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tests.
     * @param {TestDeleteManyArgs} args - Arguments to filter Tests to delete.
     * @example
     * // Delete a few Tests
     * const { count } = await prisma.test.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TestDeleteManyArgs>(args?: SelectSubset<T, TestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tests
     * const test = await prisma.test.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TestUpdateManyArgs>(args: SelectSubset<T, TestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tests and returns the data updated in the database.
     * @param {TestUpdateManyAndReturnArgs} args - Arguments to update many Tests.
     * @example
     * // Update many Tests
     * const test = await prisma.test.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tests and only return the `id`
     * const testWithIdOnly = await prisma.test.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TestUpdateManyAndReturnArgs>(args: SelectSubset<T, TestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Test.
     * @param {TestUpsertArgs} args - Arguments to update or create a Test.
     * @example
     * // Update or create a Test
     * const test = await prisma.test.upsert({
     *   create: {
     *     // ... data to create a Test
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Test we want to update
     *   }
     * })
     */
    upsert<T extends TestUpsertArgs>(args: SelectSubset<T, TestUpsertArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCountArgs} args - Arguments to filter Tests to count.
     * @example
     * // Count the number of Tests
     * const count = await prisma.test.count({
     *   where: {
     *     // ... the filter for the Tests we want to count
     *   }
     * })
    **/
    count<T extends TestCountArgs>(
      args?: Subset<T, TestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Test.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TestAggregateArgs>(args: Subset<T, TestAggregateArgs>): Prisma.PrismaPromise<GetTestAggregateType<T>>

    /**
     * Group by Test.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TestGroupByArgs['orderBy'] }
        : { orderBy?: TestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Test model
   */
  readonly fields: TestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Test.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    questions<T extends Test$questionsArgs<ExtArgs> = {}>(args?: Subset<T, Test$questionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    testScores<T extends Test$testScoresArgs<ExtArgs> = {}>(args?: Subset<T, Test$testScoresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    liveAttempts<T extends Test$liveAttemptsArgs<ExtArgs> = {}>(args?: Subset<T, Test$liveAttemptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LiveTestAttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    proctorFlags<T extends Test$proctorFlagsArgs<ExtArgs> = {}>(args?: Subset<T, Test$proctorFlagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LiveProctorFlagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Test model
   */
  interface TestFieldRefs {
    readonly id: FieldRef<"Test", 'String'>
    readonly name: FieldRef<"Test", 'String'>
    readonly description: FieldRef<"Test", 'String'>
    readonly subjectName: FieldRef<"Test", 'String'>
    readonly totalMarks: FieldRef<"Test", 'Int'>
    readonly numberOfQuestions: FieldRef<"Test", 'Int'>
    readonly difficulty: FieldRef<"Test", 'Difficulty'>
    readonly slug: FieldRef<"Test", 'String'>
    readonly settings: FieldRef<"Test", 'String'>
    readonly visibility: FieldRef<"Test", 'Boolean'>
    readonly isScheduled: FieldRef<"Test", 'Boolean'>
    readonly startTime: FieldRef<"Test", 'DateTime'>
    readonly duration: FieldRef<"Test", 'Int'>
    readonly allowRetake: FieldRef<"Test", 'Boolean'>
    readonly showResults: FieldRef<"Test", 'Boolean'>
    readonly createdById: FieldRef<"Test", 'String'>
    readonly createdAt: FieldRef<"Test", 'DateTime'>
    readonly updatedAt: FieldRef<"Test", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Test findUnique
   */
  export type TestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * Filter, which Test to fetch.
     */
    where: TestWhereUniqueInput
  }

  /**
   * Test findUniqueOrThrow
   */
  export type TestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * Filter, which Test to fetch.
     */
    where: TestWhereUniqueInput
  }

  /**
   * Test findFirst
   */
  export type TestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * Filter, which Test to fetch.
     */
    where?: TestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tests to fetch.
     */
    orderBy?: TestOrderByWithRelationInput | TestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tests.
     */
    cursor?: TestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tests.
     */
    distinct?: TestScalarFieldEnum | TestScalarFieldEnum[]
  }

  /**
   * Test findFirstOrThrow
   */
  export type TestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * Filter, which Test to fetch.
     */
    where?: TestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tests to fetch.
     */
    orderBy?: TestOrderByWithRelationInput | TestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tests.
     */
    cursor?: TestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tests.
     */
    distinct?: TestScalarFieldEnum | TestScalarFieldEnum[]
  }

  /**
   * Test findMany
   */
  export type TestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * Filter, which Tests to fetch.
     */
    where?: TestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tests to fetch.
     */
    orderBy?: TestOrderByWithRelationInput | TestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tests.
     */
    cursor?: TestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tests.
     */
    distinct?: TestScalarFieldEnum | TestScalarFieldEnum[]
  }

  /**
   * Test create
   */
  export type TestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * The data needed to create a Test.
     */
    data: XOR<TestCreateInput, TestUncheckedCreateInput>
  }

  /**
   * Test createMany
   */
  export type TestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tests.
     */
    data: TestCreateManyInput | TestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Test createManyAndReturn
   */
  export type TestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * The data used to create many Tests.
     */
    data: TestCreateManyInput | TestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Test update
   */
  export type TestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * The data needed to update a Test.
     */
    data: XOR<TestUpdateInput, TestUncheckedUpdateInput>
    /**
     * Choose, which Test to update.
     */
    where: TestWhereUniqueInput
  }

  /**
   * Test updateMany
   */
  export type TestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tests.
     */
    data: XOR<TestUpdateManyMutationInput, TestUncheckedUpdateManyInput>
    /**
     * Filter which Tests to update
     */
    where?: TestWhereInput
    /**
     * Limit how many Tests to update.
     */
    limit?: number
  }

  /**
   * Test updateManyAndReturn
   */
  export type TestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * The data used to update Tests.
     */
    data: XOR<TestUpdateManyMutationInput, TestUncheckedUpdateManyInput>
    /**
     * Filter which Tests to update
     */
    where?: TestWhereInput
    /**
     * Limit how many Tests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Test upsert
   */
  export type TestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * The filter to search for the Test to update in case it exists.
     */
    where: TestWhereUniqueInput
    /**
     * In case the Test found by the `where` argument doesn't exist, create a new Test with this data.
     */
    create: XOR<TestCreateInput, TestUncheckedCreateInput>
    /**
     * In case the Test was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TestUpdateInput, TestUncheckedUpdateInput>
  }

  /**
   * Test delete
   */
  export type TestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * Filter which Test to delete.
     */
    where: TestWhereUniqueInput
  }

  /**
   * Test deleteMany
   */
  export type TestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tests to delete
     */
    where?: TestWhereInput
    /**
     * Limit how many Tests to delete.
     */
    limit?: number
  }

  /**
   * Test.questions
   */
  export type Test$questionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    where?: QuestionWhereInput
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    cursor?: QuestionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Test.testScores
   */
  export type Test$testScoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
    where?: TestScoreWhereInput
    orderBy?: TestScoreOrderByWithRelationInput | TestScoreOrderByWithRelationInput[]
    cursor?: TestScoreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TestScoreScalarFieldEnum | TestScoreScalarFieldEnum[]
  }

  /**
   * Test.liveAttempts
   */
  export type Test$liveAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveTestAttempt
     */
    select?: LiveTestAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveTestAttempt
     */
    omit?: LiveTestAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveTestAttemptInclude<ExtArgs> | null
    where?: LiveTestAttemptWhereInput
    orderBy?: LiveTestAttemptOrderByWithRelationInput | LiveTestAttemptOrderByWithRelationInput[]
    cursor?: LiveTestAttemptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LiveTestAttemptScalarFieldEnum | LiveTestAttemptScalarFieldEnum[]
  }

  /**
   * Test.proctorFlags
   */
  export type Test$proctorFlagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveProctorFlag
     */
    select?: LiveProctorFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveProctorFlag
     */
    omit?: LiveProctorFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveProctorFlagInclude<ExtArgs> | null
    where?: LiveProctorFlagWhereInput
    orderBy?: LiveProctorFlagOrderByWithRelationInput | LiveProctorFlagOrderByWithRelationInput[]
    cursor?: LiveProctorFlagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LiveProctorFlagScalarFieldEnum | LiveProctorFlagScalarFieldEnum[]
  }

  /**
   * Test without action
   */
  export type TestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
  }


  /**
   * Model LiveTestAttempt
   */

  export type AggregateLiveTestAttempt = {
    _count: LiveTestAttemptCountAggregateOutputType | null
    _avg: LiveTestAttemptAvgAggregateOutputType | null
    _sum: LiveTestAttemptSumAggregateOutputType | null
    _min: LiveTestAttemptMinAggregateOutputType | null
    _max: LiveTestAttemptMaxAggregateOutputType | null
  }

  export type LiveTestAttemptAvgAggregateOutputType = {
    score: number | null
    totalMarks: number | null
    proctorDeductions: number | null
    timePenaltySeconds: number | null
    examCurrentIndex: number | null
  }

  export type LiveTestAttemptSumAggregateOutputType = {
    score: number | null
    totalMarks: number | null
    proctorDeductions: number | null
    timePenaltySeconds: number | null
    examCurrentIndex: number | null
  }

  export type LiveTestAttemptMinAggregateOutputType = {
    id: string | null
    testId: string | null
    studentId: string | null
    passwordUsed: boolean | null
    setupCompleted: boolean | null
    startedAt: Date | null
    examStartedAt: Date | null
    submittedAt: Date | null
    answers: string | null
    flagged: string | null
    score: number | null
    totalMarks: number | null
    proctorDeductions: number | null
    timePenaltySeconds: number | null
    examCurrentIndex: number | null
    endedByProctor: boolean | null
    endReason: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LiveTestAttemptMaxAggregateOutputType = {
    id: string | null
    testId: string | null
    studentId: string | null
    passwordUsed: boolean | null
    setupCompleted: boolean | null
    startedAt: Date | null
    examStartedAt: Date | null
    submittedAt: Date | null
    answers: string | null
    flagged: string | null
    score: number | null
    totalMarks: number | null
    proctorDeductions: number | null
    timePenaltySeconds: number | null
    examCurrentIndex: number | null
    endedByProctor: boolean | null
    endReason: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LiveTestAttemptCountAggregateOutputType = {
    id: number
    testId: number
    studentId: number
    passwordUsed: number
    setupCompleted: number
    startedAt: number
    examStartedAt: number
    submittedAt: number
    answers: number
    flagged: number
    score: number
    totalMarks: number
    violationFlags: number
    proctorDeductions: number
    timePenaltySeconds: number
    examCurrentIndex: number
    endedByProctor: number
    endReason: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LiveTestAttemptAvgAggregateInputType = {
    score?: true
    totalMarks?: true
    proctorDeductions?: true
    timePenaltySeconds?: true
    examCurrentIndex?: true
  }

  export type LiveTestAttemptSumAggregateInputType = {
    score?: true
    totalMarks?: true
    proctorDeductions?: true
    timePenaltySeconds?: true
    examCurrentIndex?: true
  }

  export type LiveTestAttemptMinAggregateInputType = {
    id?: true
    testId?: true
    studentId?: true
    passwordUsed?: true
    setupCompleted?: true
    startedAt?: true
    examStartedAt?: true
    submittedAt?: true
    answers?: true
    flagged?: true
    score?: true
    totalMarks?: true
    proctorDeductions?: true
    timePenaltySeconds?: true
    examCurrentIndex?: true
    endedByProctor?: true
    endReason?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LiveTestAttemptMaxAggregateInputType = {
    id?: true
    testId?: true
    studentId?: true
    passwordUsed?: true
    setupCompleted?: true
    startedAt?: true
    examStartedAt?: true
    submittedAt?: true
    answers?: true
    flagged?: true
    score?: true
    totalMarks?: true
    proctorDeductions?: true
    timePenaltySeconds?: true
    examCurrentIndex?: true
    endedByProctor?: true
    endReason?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LiveTestAttemptCountAggregateInputType = {
    id?: true
    testId?: true
    studentId?: true
    passwordUsed?: true
    setupCompleted?: true
    startedAt?: true
    examStartedAt?: true
    submittedAt?: true
    answers?: true
    flagged?: true
    score?: true
    totalMarks?: true
    violationFlags?: true
    proctorDeductions?: true
    timePenaltySeconds?: true
    examCurrentIndex?: true
    endedByProctor?: true
    endReason?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LiveTestAttemptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LiveTestAttempt to aggregate.
     */
    where?: LiveTestAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LiveTestAttempts to fetch.
     */
    orderBy?: LiveTestAttemptOrderByWithRelationInput | LiveTestAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LiveTestAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LiveTestAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LiveTestAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LiveTestAttempts
    **/
    _count?: true | LiveTestAttemptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LiveTestAttemptAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LiveTestAttemptSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LiveTestAttemptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LiveTestAttemptMaxAggregateInputType
  }

  export type GetLiveTestAttemptAggregateType<T extends LiveTestAttemptAggregateArgs> = {
        [P in keyof T & keyof AggregateLiveTestAttempt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLiveTestAttempt[P]>
      : GetScalarType<T[P], AggregateLiveTestAttempt[P]>
  }




  export type LiveTestAttemptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LiveTestAttemptWhereInput
    orderBy?: LiveTestAttemptOrderByWithAggregationInput | LiveTestAttemptOrderByWithAggregationInput[]
    by: LiveTestAttemptScalarFieldEnum[] | LiveTestAttemptScalarFieldEnum
    having?: LiveTestAttemptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LiveTestAttemptCountAggregateInputType | true
    _avg?: LiveTestAttemptAvgAggregateInputType
    _sum?: LiveTestAttemptSumAggregateInputType
    _min?: LiveTestAttemptMinAggregateInputType
    _max?: LiveTestAttemptMaxAggregateInputType
  }

  export type LiveTestAttemptGroupByOutputType = {
    id: string
    testId: string
    studentId: string
    passwordUsed: boolean
    setupCompleted: boolean
    startedAt: Date
    examStartedAt: Date | null
    submittedAt: Date | null
    answers: string
    flagged: string
    score: number | null
    totalMarks: number | null
    violationFlags: JsonValue
    proctorDeductions: number
    timePenaltySeconds: number
    examCurrentIndex: number
    endedByProctor: boolean
    endReason: string | null
    createdAt: Date
    updatedAt: Date
    _count: LiveTestAttemptCountAggregateOutputType | null
    _avg: LiveTestAttemptAvgAggregateOutputType | null
    _sum: LiveTestAttemptSumAggregateOutputType | null
    _min: LiveTestAttemptMinAggregateOutputType | null
    _max: LiveTestAttemptMaxAggregateOutputType | null
  }

  type GetLiveTestAttemptGroupByPayload<T extends LiveTestAttemptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LiveTestAttemptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LiveTestAttemptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LiveTestAttemptGroupByOutputType[P]>
            : GetScalarType<T[P], LiveTestAttemptGroupByOutputType[P]>
        }
      >
    >


  export type LiveTestAttemptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    testId?: boolean
    studentId?: boolean
    passwordUsed?: boolean
    setupCompleted?: boolean
    startedAt?: boolean
    examStartedAt?: boolean
    submittedAt?: boolean
    answers?: boolean
    flagged?: boolean
    score?: boolean
    totalMarks?: boolean
    violationFlags?: boolean
    proctorDeductions?: boolean
    timePenaltySeconds?: boolean
    examCurrentIndex?: boolean
    endedByProctor?: boolean
    endReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    test?: boolean | TestDefaultArgs<ExtArgs>
    student?: boolean | StudentDefaultArgs<ExtArgs>
    proctorFlags?: boolean | LiveTestAttempt$proctorFlagsArgs<ExtArgs>
    _count?: boolean | LiveTestAttemptCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["liveTestAttempt"]>

  export type LiveTestAttemptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    testId?: boolean
    studentId?: boolean
    passwordUsed?: boolean
    setupCompleted?: boolean
    startedAt?: boolean
    examStartedAt?: boolean
    submittedAt?: boolean
    answers?: boolean
    flagged?: boolean
    score?: boolean
    totalMarks?: boolean
    violationFlags?: boolean
    proctorDeductions?: boolean
    timePenaltySeconds?: boolean
    examCurrentIndex?: boolean
    endedByProctor?: boolean
    endReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    test?: boolean | TestDefaultArgs<ExtArgs>
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["liveTestAttempt"]>

  export type LiveTestAttemptSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    testId?: boolean
    studentId?: boolean
    passwordUsed?: boolean
    setupCompleted?: boolean
    startedAt?: boolean
    examStartedAt?: boolean
    submittedAt?: boolean
    answers?: boolean
    flagged?: boolean
    score?: boolean
    totalMarks?: boolean
    violationFlags?: boolean
    proctorDeductions?: boolean
    timePenaltySeconds?: boolean
    examCurrentIndex?: boolean
    endedByProctor?: boolean
    endReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    test?: boolean | TestDefaultArgs<ExtArgs>
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["liveTestAttempt"]>

  export type LiveTestAttemptSelectScalar = {
    id?: boolean
    testId?: boolean
    studentId?: boolean
    passwordUsed?: boolean
    setupCompleted?: boolean
    startedAt?: boolean
    examStartedAt?: boolean
    submittedAt?: boolean
    answers?: boolean
    flagged?: boolean
    score?: boolean
    totalMarks?: boolean
    violationFlags?: boolean
    proctorDeductions?: boolean
    timePenaltySeconds?: boolean
    examCurrentIndex?: boolean
    endedByProctor?: boolean
    endReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LiveTestAttemptOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "testId" | "studentId" | "passwordUsed" | "setupCompleted" | "startedAt" | "examStartedAt" | "submittedAt" | "answers" | "flagged" | "score" | "totalMarks" | "violationFlags" | "proctorDeductions" | "timePenaltySeconds" | "examCurrentIndex" | "endedByProctor" | "endReason" | "createdAt" | "updatedAt", ExtArgs["result"]["liveTestAttempt"]>
  export type LiveTestAttemptInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    test?: boolean | TestDefaultArgs<ExtArgs>
    student?: boolean | StudentDefaultArgs<ExtArgs>
    proctorFlags?: boolean | LiveTestAttempt$proctorFlagsArgs<ExtArgs>
    _count?: boolean | LiveTestAttemptCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LiveTestAttemptIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    test?: boolean | TestDefaultArgs<ExtArgs>
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type LiveTestAttemptIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    test?: boolean | TestDefaultArgs<ExtArgs>
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }

  export type $LiveTestAttemptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LiveTestAttempt"
    objects: {
      test: Prisma.$TestPayload<ExtArgs>
      student: Prisma.$StudentPayload<ExtArgs>
      proctorFlags: Prisma.$LiveProctorFlagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      testId: string
      studentId: string
      passwordUsed: boolean
      setupCompleted: boolean
      startedAt: Date
      examStartedAt: Date | null
      submittedAt: Date | null
      answers: string
      flagged: string
      score: number | null
      totalMarks: number | null
      violationFlags: Prisma.JsonValue
      proctorDeductions: number
      timePenaltySeconds: number
      examCurrentIndex: number
      endedByProctor: boolean
      endReason: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["liveTestAttempt"]>
    composites: {}
  }

  type LiveTestAttemptGetPayload<S extends boolean | null | undefined | LiveTestAttemptDefaultArgs> = $Result.GetResult<Prisma.$LiveTestAttemptPayload, S>

  type LiveTestAttemptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LiveTestAttemptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LiveTestAttemptCountAggregateInputType | true
    }

  export interface LiveTestAttemptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LiveTestAttempt'], meta: { name: 'LiveTestAttempt' } }
    /**
     * Find zero or one LiveTestAttempt that matches the filter.
     * @param {LiveTestAttemptFindUniqueArgs} args - Arguments to find a LiveTestAttempt
     * @example
     * // Get one LiveTestAttempt
     * const liveTestAttempt = await prisma.liveTestAttempt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LiveTestAttemptFindUniqueArgs>(args: SelectSubset<T, LiveTestAttemptFindUniqueArgs<ExtArgs>>): Prisma__LiveTestAttemptClient<$Result.GetResult<Prisma.$LiveTestAttemptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LiveTestAttempt that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LiveTestAttemptFindUniqueOrThrowArgs} args - Arguments to find a LiveTestAttempt
     * @example
     * // Get one LiveTestAttempt
     * const liveTestAttempt = await prisma.liveTestAttempt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LiveTestAttemptFindUniqueOrThrowArgs>(args: SelectSubset<T, LiveTestAttemptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LiveTestAttemptClient<$Result.GetResult<Prisma.$LiveTestAttemptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LiveTestAttempt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiveTestAttemptFindFirstArgs} args - Arguments to find a LiveTestAttempt
     * @example
     * // Get one LiveTestAttempt
     * const liveTestAttempt = await prisma.liveTestAttempt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LiveTestAttemptFindFirstArgs>(args?: SelectSubset<T, LiveTestAttemptFindFirstArgs<ExtArgs>>): Prisma__LiveTestAttemptClient<$Result.GetResult<Prisma.$LiveTestAttemptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LiveTestAttempt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiveTestAttemptFindFirstOrThrowArgs} args - Arguments to find a LiveTestAttempt
     * @example
     * // Get one LiveTestAttempt
     * const liveTestAttempt = await prisma.liveTestAttempt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LiveTestAttemptFindFirstOrThrowArgs>(args?: SelectSubset<T, LiveTestAttemptFindFirstOrThrowArgs<ExtArgs>>): Prisma__LiveTestAttemptClient<$Result.GetResult<Prisma.$LiveTestAttemptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LiveTestAttempts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiveTestAttemptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LiveTestAttempts
     * const liveTestAttempts = await prisma.liveTestAttempt.findMany()
     * 
     * // Get first 10 LiveTestAttempts
     * const liveTestAttempts = await prisma.liveTestAttempt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const liveTestAttemptWithIdOnly = await prisma.liveTestAttempt.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LiveTestAttemptFindManyArgs>(args?: SelectSubset<T, LiveTestAttemptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LiveTestAttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LiveTestAttempt.
     * @param {LiveTestAttemptCreateArgs} args - Arguments to create a LiveTestAttempt.
     * @example
     * // Create one LiveTestAttempt
     * const LiveTestAttempt = await prisma.liveTestAttempt.create({
     *   data: {
     *     // ... data to create a LiveTestAttempt
     *   }
     * })
     * 
     */
    create<T extends LiveTestAttemptCreateArgs>(args: SelectSubset<T, LiveTestAttemptCreateArgs<ExtArgs>>): Prisma__LiveTestAttemptClient<$Result.GetResult<Prisma.$LiveTestAttemptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LiveTestAttempts.
     * @param {LiveTestAttemptCreateManyArgs} args - Arguments to create many LiveTestAttempts.
     * @example
     * // Create many LiveTestAttempts
     * const liveTestAttempt = await prisma.liveTestAttempt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LiveTestAttemptCreateManyArgs>(args?: SelectSubset<T, LiveTestAttemptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LiveTestAttempts and returns the data saved in the database.
     * @param {LiveTestAttemptCreateManyAndReturnArgs} args - Arguments to create many LiveTestAttempts.
     * @example
     * // Create many LiveTestAttempts
     * const liveTestAttempt = await prisma.liveTestAttempt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LiveTestAttempts and only return the `id`
     * const liveTestAttemptWithIdOnly = await prisma.liveTestAttempt.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LiveTestAttemptCreateManyAndReturnArgs>(args?: SelectSubset<T, LiveTestAttemptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LiveTestAttemptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LiveTestAttempt.
     * @param {LiveTestAttemptDeleteArgs} args - Arguments to delete one LiveTestAttempt.
     * @example
     * // Delete one LiveTestAttempt
     * const LiveTestAttempt = await prisma.liveTestAttempt.delete({
     *   where: {
     *     // ... filter to delete one LiveTestAttempt
     *   }
     * })
     * 
     */
    delete<T extends LiveTestAttemptDeleteArgs>(args: SelectSubset<T, LiveTestAttemptDeleteArgs<ExtArgs>>): Prisma__LiveTestAttemptClient<$Result.GetResult<Prisma.$LiveTestAttemptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LiveTestAttempt.
     * @param {LiveTestAttemptUpdateArgs} args - Arguments to update one LiveTestAttempt.
     * @example
     * // Update one LiveTestAttempt
     * const liveTestAttempt = await prisma.liveTestAttempt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LiveTestAttemptUpdateArgs>(args: SelectSubset<T, LiveTestAttemptUpdateArgs<ExtArgs>>): Prisma__LiveTestAttemptClient<$Result.GetResult<Prisma.$LiveTestAttemptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LiveTestAttempts.
     * @param {LiveTestAttemptDeleteManyArgs} args - Arguments to filter LiveTestAttempts to delete.
     * @example
     * // Delete a few LiveTestAttempts
     * const { count } = await prisma.liveTestAttempt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LiveTestAttemptDeleteManyArgs>(args?: SelectSubset<T, LiveTestAttemptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LiveTestAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiveTestAttemptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LiveTestAttempts
     * const liveTestAttempt = await prisma.liveTestAttempt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LiveTestAttemptUpdateManyArgs>(args: SelectSubset<T, LiveTestAttemptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LiveTestAttempts and returns the data updated in the database.
     * @param {LiveTestAttemptUpdateManyAndReturnArgs} args - Arguments to update many LiveTestAttempts.
     * @example
     * // Update many LiveTestAttempts
     * const liveTestAttempt = await prisma.liveTestAttempt.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LiveTestAttempts and only return the `id`
     * const liveTestAttemptWithIdOnly = await prisma.liveTestAttempt.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LiveTestAttemptUpdateManyAndReturnArgs>(args: SelectSubset<T, LiveTestAttemptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LiveTestAttemptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LiveTestAttempt.
     * @param {LiveTestAttemptUpsertArgs} args - Arguments to update or create a LiveTestAttempt.
     * @example
     * // Update or create a LiveTestAttempt
     * const liveTestAttempt = await prisma.liveTestAttempt.upsert({
     *   create: {
     *     // ... data to create a LiveTestAttempt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LiveTestAttempt we want to update
     *   }
     * })
     */
    upsert<T extends LiveTestAttemptUpsertArgs>(args: SelectSubset<T, LiveTestAttemptUpsertArgs<ExtArgs>>): Prisma__LiveTestAttemptClient<$Result.GetResult<Prisma.$LiveTestAttemptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LiveTestAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiveTestAttemptCountArgs} args - Arguments to filter LiveTestAttempts to count.
     * @example
     * // Count the number of LiveTestAttempts
     * const count = await prisma.liveTestAttempt.count({
     *   where: {
     *     // ... the filter for the LiveTestAttempts we want to count
     *   }
     * })
    **/
    count<T extends LiveTestAttemptCountArgs>(
      args?: Subset<T, LiveTestAttemptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LiveTestAttemptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LiveTestAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiveTestAttemptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LiveTestAttemptAggregateArgs>(args: Subset<T, LiveTestAttemptAggregateArgs>): Prisma.PrismaPromise<GetLiveTestAttemptAggregateType<T>>

    /**
     * Group by LiveTestAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiveTestAttemptGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LiveTestAttemptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LiveTestAttemptGroupByArgs['orderBy'] }
        : { orderBy?: LiveTestAttemptGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LiveTestAttemptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLiveTestAttemptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LiveTestAttempt model
   */
  readonly fields: LiveTestAttemptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LiveTestAttempt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LiveTestAttemptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    test<T extends TestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TestDefaultArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    proctorFlags<T extends LiveTestAttempt$proctorFlagsArgs<ExtArgs> = {}>(args?: Subset<T, LiveTestAttempt$proctorFlagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LiveProctorFlagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LiveTestAttempt model
   */
  interface LiveTestAttemptFieldRefs {
    readonly id: FieldRef<"LiveTestAttempt", 'String'>
    readonly testId: FieldRef<"LiveTestAttempt", 'String'>
    readonly studentId: FieldRef<"LiveTestAttempt", 'String'>
    readonly passwordUsed: FieldRef<"LiveTestAttempt", 'Boolean'>
    readonly setupCompleted: FieldRef<"LiveTestAttempt", 'Boolean'>
    readonly startedAt: FieldRef<"LiveTestAttempt", 'DateTime'>
    readonly examStartedAt: FieldRef<"LiveTestAttempt", 'DateTime'>
    readonly submittedAt: FieldRef<"LiveTestAttempt", 'DateTime'>
    readonly answers: FieldRef<"LiveTestAttempt", 'String'>
    readonly flagged: FieldRef<"LiveTestAttempt", 'String'>
    readonly score: FieldRef<"LiveTestAttempt", 'Int'>
    readonly totalMarks: FieldRef<"LiveTestAttempt", 'Int'>
    readonly violationFlags: FieldRef<"LiveTestAttempt", 'Json'>
    readonly proctorDeductions: FieldRef<"LiveTestAttempt", 'Int'>
    readonly timePenaltySeconds: FieldRef<"LiveTestAttempt", 'Int'>
    readonly examCurrentIndex: FieldRef<"LiveTestAttempt", 'Int'>
    readonly endedByProctor: FieldRef<"LiveTestAttempt", 'Boolean'>
    readonly endReason: FieldRef<"LiveTestAttempt", 'String'>
    readonly createdAt: FieldRef<"LiveTestAttempt", 'DateTime'>
    readonly updatedAt: FieldRef<"LiveTestAttempt", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LiveTestAttempt findUnique
   */
  export type LiveTestAttemptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveTestAttempt
     */
    select?: LiveTestAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveTestAttempt
     */
    omit?: LiveTestAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveTestAttemptInclude<ExtArgs> | null
    /**
     * Filter, which LiveTestAttempt to fetch.
     */
    where: LiveTestAttemptWhereUniqueInput
  }

  /**
   * LiveTestAttempt findUniqueOrThrow
   */
  export type LiveTestAttemptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveTestAttempt
     */
    select?: LiveTestAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveTestAttempt
     */
    omit?: LiveTestAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveTestAttemptInclude<ExtArgs> | null
    /**
     * Filter, which LiveTestAttempt to fetch.
     */
    where: LiveTestAttemptWhereUniqueInput
  }

  /**
   * LiveTestAttempt findFirst
   */
  export type LiveTestAttemptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveTestAttempt
     */
    select?: LiveTestAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveTestAttempt
     */
    omit?: LiveTestAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveTestAttemptInclude<ExtArgs> | null
    /**
     * Filter, which LiveTestAttempt to fetch.
     */
    where?: LiveTestAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LiveTestAttempts to fetch.
     */
    orderBy?: LiveTestAttemptOrderByWithRelationInput | LiveTestAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LiveTestAttempts.
     */
    cursor?: LiveTestAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LiveTestAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LiveTestAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LiveTestAttempts.
     */
    distinct?: LiveTestAttemptScalarFieldEnum | LiveTestAttemptScalarFieldEnum[]
  }

  /**
   * LiveTestAttempt findFirstOrThrow
   */
  export type LiveTestAttemptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveTestAttempt
     */
    select?: LiveTestAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveTestAttempt
     */
    omit?: LiveTestAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveTestAttemptInclude<ExtArgs> | null
    /**
     * Filter, which LiveTestAttempt to fetch.
     */
    where?: LiveTestAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LiveTestAttempts to fetch.
     */
    orderBy?: LiveTestAttemptOrderByWithRelationInput | LiveTestAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LiveTestAttempts.
     */
    cursor?: LiveTestAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LiveTestAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LiveTestAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LiveTestAttempts.
     */
    distinct?: LiveTestAttemptScalarFieldEnum | LiveTestAttemptScalarFieldEnum[]
  }

  /**
   * LiveTestAttempt findMany
   */
  export type LiveTestAttemptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveTestAttempt
     */
    select?: LiveTestAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveTestAttempt
     */
    omit?: LiveTestAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveTestAttemptInclude<ExtArgs> | null
    /**
     * Filter, which LiveTestAttempts to fetch.
     */
    where?: LiveTestAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LiveTestAttempts to fetch.
     */
    orderBy?: LiveTestAttemptOrderByWithRelationInput | LiveTestAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LiveTestAttempts.
     */
    cursor?: LiveTestAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LiveTestAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LiveTestAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LiveTestAttempts.
     */
    distinct?: LiveTestAttemptScalarFieldEnum | LiveTestAttemptScalarFieldEnum[]
  }

  /**
   * LiveTestAttempt create
   */
  export type LiveTestAttemptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveTestAttempt
     */
    select?: LiveTestAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveTestAttempt
     */
    omit?: LiveTestAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveTestAttemptInclude<ExtArgs> | null
    /**
     * The data needed to create a LiveTestAttempt.
     */
    data: XOR<LiveTestAttemptCreateInput, LiveTestAttemptUncheckedCreateInput>
  }

  /**
   * LiveTestAttempt createMany
   */
  export type LiveTestAttemptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LiveTestAttempts.
     */
    data: LiveTestAttemptCreateManyInput | LiveTestAttemptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LiveTestAttempt createManyAndReturn
   */
  export type LiveTestAttemptCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveTestAttempt
     */
    select?: LiveTestAttemptSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LiveTestAttempt
     */
    omit?: LiveTestAttemptOmit<ExtArgs> | null
    /**
     * The data used to create many LiveTestAttempts.
     */
    data: LiveTestAttemptCreateManyInput | LiveTestAttemptCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveTestAttemptIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LiveTestAttempt update
   */
  export type LiveTestAttemptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveTestAttempt
     */
    select?: LiveTestAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveTestAttempt
     */
    omit?: LiveTestAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveTestAttemptInclude<ExtArgs> | null
    /**
     * The data needed to update a LiveTestAttempt.
     */
    data: XOR<LiveTestAttemptUpdateInput, LiveTestAttemptUncheckedUpdateInput>
    /**
     * Choose, which LiveTestAttempt to update.
     */
    where: LiveTestAttemptWhereUniqueInput
  }

  /**
   * LiveTestAttempt updateMany
   */
  export type LiveTestAttemptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LiveTestAttempts.
     */
    data: XOR<LiveTestAttemptUpdateManyMutationInput, LiveTestAttemptUncheckedUpdateManyInput>
    /**
     * Filter which LiveTestAttempts to update
     */
    where?: LiveTestAttemptWhereInput
    /**
     * Limit how many LiveTestAttempts to update.
     */
    limit?: number
  }

  /**
   * LiveTestAttempt updateManyAndReturn
   */
  export type LiveTestAttemptUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveTestAttempt
     */
    select?: LiveTestAttemptSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LiveTestAttempt
     */
    omit?: LiveTestAttemptOmit<ExtArgs> | null
    /**
     * The data used to update LiveTestAttempts.
     */
    data: XOR<LiveTestAttemptUpdateManyMutationInput, LiveTestAttemptUncheckedUpdateManyInput>
    /**
     * Filter which LiveTestAttempts to update
     */
    where?: LiveTestAttemptWhereInput
    /**
     * Limit how many LiveTestAttempts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveTestAttemptIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LiveTestAttempt upsert
   */
  export type LiveTestAttemptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveTestAttempt
     */
    select?: LiveTestAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveTestAttempt
     */
    omit?: LiveTestAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveTestAttemptInclude<ExtArgs> | null
    /**
     * The filter to search for the LiveTestAttempt to update in case it exists.
     */
    where: LiveTestAttemptWhereUniqueInput
    /**
     * In case the LiveTestAttempt found by the `where` argument doesn't exist, create a new LiveTestAttempt with this data.
     */
    create: XOR<LiveTestAttemptCreateInput, LiveTestAttemptUncheckedCreateInput>
    /**
     * In case the LiveTestAttempt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LiveTestAttemptUpdateInput, LiveTestAttemptUncheckedUpdateInput>
  }

  /**
   * LiveTestAttempt delete
   */
  export type LiveTestAttemptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveTestAttempt
     */
    select?: LiveTestAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveTestAttempt
     */
    omit?: LiveTestAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveTestAttemptInclude<ExtArgs> | null
    /**
     * Filter which LiveTestAttempt to delete.
     */
    where: LiveTestAttemptWhereUniqueInput
  }

  /**
   * LiveTestAttempt deleteMany
   */
  export type LiveTestAttemptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LiveTestAttempts to delete
     */
    where?: LiveTestAttemptWhereInput
    /**
     * Limit how many LiveTestAttempts to delete.
     */
    limit?: number
  }

  /**
   * LiveTestAttempt.proctorFlags
   */
  export type LiveTestAttempt$proctorFlagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveProctorFlag
     */
    select?: LiveProctorFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveProctorFlag
     */
    omit?: LiveProctorFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveProctorFlagInclude<ExtArgs> | null
    where?: LiveProctorFlagWhereInput
    orderBy?: LiveProctorFlagOrderByWithRelationInput | LiveProctorFlagOrderByWithRelationInput[]
    cursor?: LiveProctorFlagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LiveProctorFlagScalarFieldEnum | LiveProctorFlagScalarFieldEnum[]
  }

  /**
   * LiveTestAttempt without action
   */
  export type LiveTestAttemptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveTestAttempt
     */
    select?: LiveTestAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveTestAttempt
     */
    omit?: LiveTestAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveTestAttemptInclude<ExtArgs> | null
  }


  /**
   * Model LiveProctorFlag
   */

  export type AggregateLiveProctorFlag = {
    _count: LiveProctorFlagCountAggregateOutputType | null
    _min: LiveProctorFlagMinAggregateOutputType | null
    _max: LiveProctorFlagMaxAggregateOutputType | null
  }

  export type LiveProctorFlagMinAggregateOutputType = {
    id: string | null
    testId: string | null
    studentId: string | null
    attemptId: string | null
    proctorId: string | null
    note: string | null
    createdAt: Date | null
  }

  export type LiveProctorFlagMaxAggregateOutputType = {
    id: string | null
    testId: string | null
    studentId: string | null
    attemptId: string | null
    proctorId: string | null
    note: string | null
    createdAt: Date | null
  }

  export type LiveProctorFlagCountAggregateOutputType = {
    id: number
    testId: number
    studentId: number
    attemptId: number
    proctorId: number
    note: number
    createdAt: number
    _all: number
  }


  export type LiveProctorFlagMinAggregateInputType = {
    id?: true
    testId?: true
    studentId?: true
    attemptId?: true
    proctorId?: true
    note?: true
    createdAt?: true
  }

  export type LiveProctorFlagMaxAggregateInputType = {
    id?: true
    testId?: true
    studentId?: true
    attemptId?: true
    proctorId?: true
    note?: true
    createdAt?: true
  }

  export type LiveProctorFlagCountAggregateInputType = {
    id?: true
    testId?: true
    studentId?: true
    attemptId?: true
    proctorId?: true
    note?: true
    createdAt?: true
    _all?: true
  }

  export type LiveProctorFlagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LiveProctorFlag to aggregate.
     */
    where?: LiveProctorFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LiveProctorFlags to fetch.
     */
    orderBy?: LiveProctorFlagOrderByWithRelationInput | LiveProctorFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LiveProctorFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LiveProctorFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LiveProctorFlags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LiveProctorFlags
    **/
    _count?: true | LiveProctorFlagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LiveProctorFlagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LiveProctorFlagMaxAggregateInputType
  }

  export type GetLiveProctorFlagAggregateType<T extends LiveProctorFlagAggregateArgs> = {
        [P in keyof T & keyof AggregateLiveProctorFlag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLiveProctorFlag[P]>
      : GetScalarType<T[P], AggregateLiveProctorFlag[P]>
  }




  export type LiveProctorFlagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LiveProctorFlagWhereInput
    orderBy?: LiveProctorFlagOrderByWithAggregationInput | LiveProctorFlagOrderByWithAggregationInput[]
    by: LiveProctorFlagScalarFieldEnum[] | LiveProctorFlagScalarFieldEnum
    having?: LiveProctorFlagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LiveProctorFlagCountAggregateInputType | true
    _min?: LiveProctorFlagMinAggregateInputType
    _max?: LiveProctorFlagMaxAggregateInputType
  }

  export type LiveProctorFlagGroupByOutputType = {
    id: string
    testId: string
    studentId: string
    attemptId: string | null
    proctorId: string
    note: string | null
    createdAt: Date
    _count: LiveProctorFlagCountAggregateOutputType | null
    _min: LiveProctorFlagMinAggregateOutputType | null
    _max: LiveProctorFlagMaxAggregateOutputType | null
  }

  type GetLiveProctorFlagGroupByPayload<T extends LiveProctorFlagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LiveProctorFlagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LiveProctorFlagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LiveProctorFlagGroupByOutputType[P]>
            : GetScalarType<T[P], LiveProctorFlagGroupByOutputType[P]>
        }
      >
    >


  export type LiveProctorFlagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    testId?: boolean
    studentId?: boolean
    attemptId?: boolean
    proctorId?: boolean
    note?: boolean
    createdAt?: boolean
    test?: boolean | TestDefaultArgs<ExtArgs>
    student?: boolean | StudentDefaultArgs<ExtArgs>
    attempt?: boolean | LiveProctorFlag$attemptArgs<ExtArgs>
    proctor?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["liveProctorFlag"]>

  export type LiveProctorFlagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    testId?: boolean
    studentId?: boolean
    attemptId?: boolean
    proctorId?: boolean
    note?: boolean
    createdAt?: boolean
    test?: boolean | TestDefaultArgs<ExtArgs>
    student?: boolean | StudentDefaultArgs<ExtArgs>
    attempt?: boolean | LiveProctorFlag$attemptArgs<ExtArgs>
    proctor?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["liveProctorFlag"]>

  export type LiveProctorFlagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    testId?: boolean
    studentId?: boolean
    attemptId?: boolean
    proctorId?: boolean
    note?: boolean
    createdAt?: boolean
    test?: boolean | TestDefaultArgs<ExtArgs>
    student?: boolean | StudentDefaultArgs<ExtArgs>
    attempt?: boolean | LiveProctorFlag$attemptArgs<ExtArgs>
    proctor?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["liveProctorFlag"]>

  export type LiveProctorFlagSelectScalar = {
    id?: boolean
    testId?: boolean
    studentId?: boolean
    attemptId?: boolean
    proctorId?: boolean
    note?: boolean
    createdAt?: boolean
  }

  export type LiveProctorFlagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "testId" | "studentId" | "attemptId" | "proctorId" | "note" | "createdAt", ExtArgs["result"]["liveProctorFlag"]>
  export type LiveProctorFlagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    test?: boolean | TestDefaultArgs<ExtArgs>
    student?: boolean | StudentDefaultArgs<ExtArgs>
    attempt?: boolean | LiveProctorFlag$attemptArgs<ExtArgs>
    proctor?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LiveProctorFlagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    test?: boolean | TestDefaultArgs<ExtArgs>
    student?: boolean | StudentDefaultArgs<ExtArgs>
    attempt?: boolean | LiveProctorFlag$attemptArgs<ExtArgs>
    proctor?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LiveProctorFlagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    test?: boolean | TestDefaultArgs<ExtArgs>
    student?: boolean | StudentDefaultArgs<ExtArgs>
    attempt?: boolean | LiveProctorFlag$attemptArgs<ExtArgs>
    proctor?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $LiveProctorFlagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LiveProctorFlag"
    objects: {
      test: Prisma.$TestPayload<ExtArgs>
      student: Prisma.$StudentPayload<ExtArgs>
      attempt: Prisma.$LiveTestAttemptPayload<ExtArgs> | null
      proctor: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      testId: string
      studentId: string
      attemptId: string | null
      proctorId: string
      note: string | null
      createdAt: Date
    }, ExtArgs["result"]["liveProctorFlag"]>
    composites: {}
  }

  type LiveProctorFlagGetPayload<S extends boolean | null | undefined | LiveProctorFlagDefaultArgs> = $Result.GetResult<Prisma.$LiveProctorFlagPayload, S>

  type LiveProctorFlagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LiveProctorFlagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LiveProctorFlagCountAggregateInputType | true
    }

  export interface LiveProctorFlagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LiveProctorFlag'], meta: { name: 'LiveProctorFlag' } }
    /**
     * Find zero or one LiveProctorFlag that matches the filter.
     * @param {LiveProctorFlagFindUniqueArgs} args - Arguments to find a LiveProctorFlag
     * @example
     * // Get one LiveProctorFlag
     * const liveProctorFlag = await prisma.liveProctorFlag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LiveProctorFlagFindUniqueArgs>(args: SelectSubset<T, LiveProctorFlagFindUniqueArgs<ExtArgs>>): Prisma__LiveProctorFlagClient<$Result.GetResult<Prisma.$LiveProctorFlagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LiveProctorFlag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LiveProctorFlagFindUniqueOrThrowArgs} args - Arguments to find a LiveProctorFlag
     * @example
     * // Get one LiveProctorFlag
     * const liveProctorFlag = await prisma.liveProctorFlag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LiveProctorFlagFindUniqueOrThrowArgs>(args: SelectSubset<T, LiveProctorFlagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LiveProctorFlagClient<$Result.GetResult<Prisma.$LiveProctorFlagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LiveProctorFlag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiveProctorFlagFindFirstArgs} args - Arguments to find a LiveProctorFlag
     * @example
     * // Get one LiveProctorFlag
     * const liveProctorFlag = await prisma.liveProctorFlag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LiveProctorFlagFindFirstArgs>(args?: SelectSubset<T, LiveProctorFlagFindFirstArgs<ExtArgs>>): Prisma__LiveProctorFlagClient<$Result.GetResult<Prisma.$LiveProctorFlagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LiveProctorFlag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiveProctorFlagFindFirstOrThrowArgs} args - Arguments to find a LiveProctorFlag
     * @example
     * // Get one LiveProctorFlag
     * const liveProctorFlag = await prisma.liveProctorFlag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LiveProctorFlagFindFirstOrThrowArgs>(args?: SelectSubset<T, LiveProctorFlagFindFirstOrThrowArgs<ExtArgs>>): Prisma__LiveProctorFlagClient<$Result.GetResult<Prisma.$LiveProctorFlagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LiveProctorFlags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiveProctorFlagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LiveProctorFlags
     * const liveProctorFlags = await prisma.liveProctorFlag.findMany()
     * 
     * // Get first 10 LiveProctorFlags
     * const liveProctorFlags = await prisma.liveProctorFlag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const liveProctorFlagWithIdOnly = await prisma.liveProctorFlag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LiveProctorFlagFindManyArgs>(args?: SelectSubset<T, LiveProctorFlagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LiveProctorFlagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LiveProctorFlag.
     * @param {LiveProctorFlagCreateArgs} args - Arguments to create a LiveProctorFlag.
     * @example
     * // Create one LiveProctorFlag
     * const LiveProctorFlag = await prisma.liveProctorFlag.create({
     *   data: {
     *     // ... data to create a LiveProctorFlag
     *   }
     * })
     * 
     */
    create<T extends LiveProctorFlagCreateArgs>(args: SelectSubset<T, LiveProctorFlagCreateArgs<ExtArgs>>): Prisma__LiveProctorFlagClient<$Result.GetResult<Prisma.$LiveProctorFlagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LiveProctorFlags.
     * @param {LiveProctorFlagCreateManyArgs} args - Arguments to create many LiveProctorFlags.
     * @example
     * // Create many LiveProctorFlags
     * const liveProctorFlag = await prisma.liveProctorFlag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LiveProctorFlagCreateManyArgs>(args?: SelectSubset<T, LiveProctorFlagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LiveProctorFlags and returns the data saved in the database.
     * @param {LiveProctorFlagCreateManyAndReturnArgs} args - Arguments to create many LiveProctorFlags.
     * @example
     * // Create many LiveProctorFlags
     * const liveProctorFlag = await prisma.liveProctorFlag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LiveProctorFlags and only return the `id`
     * const liveProctorFlagWithIdOnly = await prisma.liveProctorFlag.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LiveProctorFlagCreateManyAndReturnArgs>(args?: SelectSubset<T, LiveProctorFlagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LiveProctorFlagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LiveProctorFlag.
     * @param {LiveProctorFlagDeleteArgs} args - Arguments to delete one LiveProctorFlag.
     * @example
     * // Delete one LiveProctorFlag
     * const LiveProctorFlag = await prisma.liveProctorFlag.delete({
     *   where: {
     *     // ... filter to delete one LiveProctorFlag
     *   }
     * })
     * 
     */
    delete<T extends LiveProctorFlagDeleteArgs>(args: SelectSubset<T, LiveProctorFlagDeleteArgs<ExtArgs>>): Prisma__LiveProctorFlagClient<$Result.GetResult<Prisma.$LiveProctorFlagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LiveProctorFlag.
     * @param {LiveProctorFlagUpdateArgs} args - Arguments to update one LiveProctorFlag.
     * @example
     * // Update one LiveProctorFlag
     * const liveProctorFlag = await prisma.liveProctorFlag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LiveProctorFlagUpdateArgs>(args: SelectSubset<T, LiveProctorFlagUpdateArgs<ExtArgs>>): Prisma__LiveProctorFlagClient<$Result.GetResult<Prisma.$LiveProctorFlagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LiveProctorFlags.
     * @param {LiveProctorFlagDeleteManyArgs} args - Arguments to filter LiveProctorFlags to delete.
     * @example
     * // Delete a few LiveProctorFlags
     * const { count } = await prisma.liveProctorFlag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LiveProctorFlagDeleteManyArgs>(args?: SelectSubset<T, LiveProctorFlagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LiveProctorFlags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiveProctorFlagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LiveProctorFlags
     * const liveProctorFlag = await prisma.liveProctorFlag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LiveProctorFlagUpdateManyArgs>(args: SelectSubset<T, LiveProctorFlagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LiveProctorFlags and returns the data updated in the database.
     * @param {LiveProctorFlagUpdateManyAndReturnArgs} args - Arguments to update many LiveProctorFlags.
     * @example
     * // Update many LiveProctorFlags
     * const liveProctorFlag = await prisma.liveProctorFlag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LiveProctorFlags and only return the `id`
     * const liveProctorFlagWithIdOnly = await prisma.liveProctorFlag.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LiveProctorFlagUpdateManyAndReturnArgs>(args: SelectSubset<T, LiveProctorFlagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LiveProctorFlagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LiveProctorFlag.
     * @param {LiveProctorFlagUpsertArgs} args - Arguments to update or create a LiveProctorFlag.
     * @example
     * // Update or create a LiveProctorFlag
     * const liveProctorFlag = await prisma.liveProctorFlag.upsert({
     *   create: {
     *     // ... data to create a LiveProctorFlag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LiveProctorFlag we want to update
     *   }
     * })
     */
    upsert<T extends LiveProctorFlagUpsertArgs>(args: SelectSubset<T, LiveProctorFlagUpsertArgs<ExtArgs>>): Prisma__LiveProctorFlagClient<$Result.GetResult<Prisma.$LiveProctorFlagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LiveProctorFlags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiveProctorFlagCountArgs} args - Arguments to filter LiveProctorFlags to count.
     * @example
     * // Count the number of LiveProctorFlags
     * const count = await prisma.liveProctorFlag.count({
     *   where: {
     *     // ... the filter for the LiveProctorFlags we want to count
     *   }
     * })
    **/
    count<T extends LiveProctorFlagCountArgs>(
      args?: Subset<T, LiveProctorFlagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LiveProctorFlagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LiveProctorFlag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiveProctorFlagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LiveProctorFlagAggregateArgs>(args: Subset<T, LiveProctorFlagAggregateArgs>): Prisma.PrismaPromise<GetLiveProctorFlagAggregateType<T>>

    /**
     * Group by LiveProctorFlag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiveProctorFlagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LiveProctorFlagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LiveProctorFlagGroupByArgs['orderBy'] }
        : { orderBy?: LiveProctorFlagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LiveProctorFlagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLiveProctorFlagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LiveProctorFlag model
   */
  readonly fields: LiveProctorFlagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LiveProctorFlag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LiveProctorFlagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    test<T extends TestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TestDefaultArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    attempt<T extends LiveProctorFlag$attemptArgs<ExtArgs> = {}>(args?: Subset<T, LiveProctorFlag$attemptArgs<ExtArgs>>): Prisma__LiveTestAttemptClient<$Result.GetResult<Prisma.$LiveTestAttemptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    proctor<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LiveProctorFlag model
   */
  interface LiveProctorFlagFieldRefs {
    readonly id: FieldRef<"LiveProctorFlag", 'String'>
    readonly testId: FieldRef<"LiveProctorFlag", 'String'>
    readonly studentId: FieldRef<"LiveProctorFlag", 'String'>
    readonly attemptId: FieldRef<"LiveProctorFlag", 'String'>
    readonly proctorId: FieldRef<"LiveProctorFlag", 'String'>
    readonly note: FieldRef<"LiveProctorFlag", 'String'>
    readonly createdAt: FieldRef<"LiveProctorFlag", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LiveProctorFlag findUnique
   */
  export type LiveProctorFlagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveProctorFlag
     */
    select?: LiveProctorFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveProctorFlag
     */
    omit?: LiveProctorFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveProctorFlagInclude<ExtArgs> | null
    /**
     * Filter, which LiveProctorFlag to fetch.
     */
    where: LiveProctorFlagWhereUniqueInput
  }

  /**
   * LiveProctorFlag findUniqueOrThrow
   */
  export type LiveProctorFlagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveProctorFlag
     */
    select?: LiveProctorFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveProctorFlag
     */
    omit?: LiveProctorFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveProctorFlagInclude<ExtArgs> | null
    /**
     * Filter, which LiveProctorFlag to fetch.
     */
    where: LiveProctorFlagWhereUniqueInput
  }

  /**
   * LiveProctorFlag findFirst
   */
  export type LiveProctorFlagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveProctorFlag
     */
    select?: LiveProctorFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveProctorFlag
     */
    omit?: LiveProctorFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveProctorFlagInclude<ExtArgs> | null
    /**
     * Filter, which LiveProctorFlag to fetch.
     */
    where?: LiveProctorFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LiveProctorFlags to fetch.
     */
    orderBy?: LiveProctorFlagOrderByWithRelationInput | LiveProctorFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LiveProctorFlags.
     */
    cursor?: LiveProctorFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LiveProctorFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LiveProctorFlags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LiveProctorFlags.
     */
    distinct?: LiveProctorFlagScalarFieldEnum | LiveProctorFlagScalarFieldEnum[]
  }

  /**
   * LiveProctorFlag findFirstOrThrow
   */
  export type LiveProctorFlagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveProctorFlag
     */
    select?: LiveProctorFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveProctorFlag
     */
    omit?: LiveProctorFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveProctorFlagInclude<ExtArgs> | null
    /**
     * Filter, which LiveProctorFlag to fetch.
     */
    where?: LiveProctorFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LiveProctorFlags to fetch.
     */
    orderBy?: LiveProctorFlagOrderByWithRelationInput | LiveProctorFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LiveProctorFlags.
     */
    cursor?: LiveProctorFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LiveProctorFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LiveProctorFlags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LiveProctorFlags.
     */
    distinct?: LiveProctorFlagScalarFieldEnum | LiveProctorFlagScalarFieldEnum[]
  }

  /**
   * LiveProctorFlag findMany
   */
  export type LiveProctorFlagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveProctorFlag
     */
    select?: LiveProctorFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveProctorFlag
     */
    omit?: LiveProctorFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveProctorFlagInclude<ExtArgs> | null
    /**
     * Filter, which LiveProctorFlags to fetch.
     */
    where?: LiveProctorFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LiveProctorFlags to fetch.
     */
    orderBy?: LiveProctorFlagOrderByWithRelationInput | LiveProctorFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LiveProctorFlags.
     */
    cursor?: LiveProctorFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LiveProctorFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LiveProctorFlags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LiveProctorFlags.
     */
    distinct?: LiveProctorFlagScalarFieldEnum | LiveProctorFlagScalarFieldEnum[]
  }

  /**
   * LiveProctorFlag create
   */
  export type LiveProctorFlagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveProctorFlag
     */
    select?: LiveProctorFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveProctorFlag
     */
    omit?: LiveProctorFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveProctorFlagInclude<ExtArgs> | null
    /**
     * The data needed to create a LiveProctorFlag.
     */
    data: XOR<LiveProctorFlagCreateInput, LiveProctorFlagUncheckedCreateInput>
  }

  /**
   * LiveProctorFlag createMany
   */
  export type LiveProctorFlagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LiveProctorFlags.
     */
    data: LiveProctorFlagCreateManyInput | LiveProctorFlagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LiveProctorFlag createManyAndReturn
   */
  export type LiveProctorFlagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveProctorFlag
     */
    select?: LiveProctorFlagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LiveProctorFlag
     */
    omit?: LiveProctorFlagOmit<ExtArgs> | null
    /**
     * The data used to create many LiveProctorFlags.
     */
    data: LiveProctorFlagCreateManyInput | LiveProctorFlagCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveProctorFlagIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LiveProctorFlag update
   */
  export type LiveProctorFlagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveProctorFlag
     */
    select?: LiveProctorFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveProctorFlag
     */
    omit?: LiveProctorFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveProctorFlagInclude<ExtArgs> | null
    /**
     * The data needed to update a LiveProctorFlag.
     */
    data: XOR<LiveProctorFlagUpdateInput, LiveProctorFlagUncheckedUpdateInput>
    /**
     * Choose, which LiveProctorFlag to update.
     */
    where: LiveProctorFlagWhereUniqueInput
  }

  /**
   * LiveProctorFlag updateMany
   */
  export type LiveProctorFlagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LiveProctorFlags.
     */
    data: XOR<LiveProctorFlagUpdateManyMutationInput, LiveProctorFlagUncheckedUpdateManyInput>
    /**
     * Filter which LiveProctorFlags to update
     */
    where?: LiveProctorFlagWhereInput
    /**
     * Limit how many LiveProctorFlags to update.
     */
    limit?: number
  }

  /**
   * LiveProctorFlag updateManyAndReturn
   */
  export type LiveProctorFlagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveProctorFlag
     */
    select?: LiveProctorFlagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LiveProctorFlag
     */
    omit?: LiveProctorFlagOmit<ExtArgs> | null
    /**
     * The data used to update LiveProctorFlags.
     */
    data: XOR<LiveProctorFlagUpdateManyMutationInput, LiveProctorFlagUncheckedUpdateManyInput>
    /**
     * Filter which LiveProctorFlags to update
     */
    where?: LiveProctorFlagWhereInput
    /**
     * Limit how many LiveProctorFlags to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveProctorFlagIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LiveProctorFlag upsert
   */
  export type LiveProctorFlagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveProctorFlag
     */
    select?: LiveProctorFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveProctorFlag
     */
    omit?: LiveProctorFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveProctorFlagInclude<ExtArgs> | null
    /**
     * The filter to search for the LiveProctorFlag to update in case it exists.
     */
    where: LiveProctorFlagWhereUniqueInput
    /**
     * In case the LiveProctorFlag found by the `where` argument doesn't exist, create a new LiveProctorFlag with this data.
     */
    create: XOR<LiveProctorFlagCreateInput, LiveProctorFlagUncheckedCreateInput>
    /**
     * In case the LiveProctorFlag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LiveProctorFlagUpdateInput, LiveProctorFlagUncheckedUpdateInput>
  }

  /**
   * LiveProctorFlag delete
   */
  export type LiveProctorFlagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveProctorFlag
     */
    select?: LiveProctorFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveProctorFlag
     */
    omit?: LiveProctorFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveProctorFlagInclude<ExtArgs> | null
    /**
     * Filter which LiveProctorFlag to delete.
     */
    where: LiveProctorFlagWhereUniqueInput
  }

  /**
   * LiveProctorFlag deleteMany
   */
  export type LiveProctorFlagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LiveProctorFlags to delete
     */
    where?: LiveProctorFlagWhereInput
    /**
     * Limit how many LiveProctorFlags to delete.
     */
    limit?: number
  }

  /**
   * LiveProctorFlag.attempt
   */
  export type LiveProctorFlag$attemptArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveTestAttempt
     */
    select?: LiveTestAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveTestAttempt
     */
    omit?: LiveTestAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveTestAttemptInclude<ExtArgs> | null
    where?: LiveTestAttemptWhereInput
  }

  /**
   * LiveProctorFlag without action
   */
  export type LiveProctorFlagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveProctorFlag
     */
    select?: LiveProctorFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveProctorFlag
     */
    omit?: LiveProctorFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveProctorFlagInclude<ExtArgs> | null
  }


  /**
   * Model Question
   */

  export type AggregateQuestion = {
    _count: QuestionCountAggregateOutputType | null
    _avg: QuestionAvgAggregateOutputType | null
    _sum: QuestionSumAggregateOutputType | null
    _min: QuestionMinAggregateOutputType | null
    _max: QuestionMaxAggregateOutputType | null
  }

  export type QuestionAvgAggregateOutputType = {
    correctOption: number | null
    marks: number | null
    order: number | null
  }

  export type QuestionSumAggregateOutputType = {
    correctOption: number | null
    marks: number | null
    order: number | null
  }

  export type QuestionMinAggregateOutputType = {
    id: string | null
    text: string | null
    type: $Enums.QuestionType | null
    options: string | null
    correctOption: number | null
    correctAnswer: string | null
    marks: number | null
    explanation: string | null
    order: number | null
    testId: string | null
  }

  export type QuestionMaxAggregateOutputType = {
    id: string | null
    text: string | null
    type: $Enums.QuestionType | null
    options: string | null
    correctOption: number | null
    correctAnswer: string | null
    marks: number | null
    explanation: string | null
    order: number | null
    testId: string | null
  }

  export type QuestionCountAggregateOutputType = {
    id: number
    text: number
    type: number
    options: number
    correctOption: number
    correctAnswer: number
    marks: number
    explanation: number
    order: number
    testId: number
    _all: number
  }


  export type QuestionAvgAggregateInputType = {
    correctOption?: true
    marks?: true
    order?: true
  }

  export type QuestionSumAggregateInputType = {
    correctOption?: true
    marks?: true
    order?: true
  }

  export type QuestionMinAggregateInputType = {
    id?: true
    text?: true
    type?: true
    options?: true
    correctOption?: true
    correctAnswer?: true
    marks?: true
    explanation?: true
    order?: true
    testId?: true
  }

  export type QuestionMaxAggregateInputType = {
    id?: true
    text?: true
    type?: true
    options?: true
    correctOption?: true
    correctAnswer?: true
    marks?: true
    explanation?: true
    order?: true
    testId?: true
  }

  export type QuestionCountAggregateInputType = {
    id?: true
    text?: true
    type?: true
    options?: true
    correctOption?: true
    correctAnswer?: true
    marks?: true
    explanation?: true
    order?: true
    testId?: true
    _all?: true
  }

  export type QuestionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Question to aggregate.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Questions
    **/
    _count?: true | QuestionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuestionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuestionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuestionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuestionMaxAggregateInputType
  }

  export type GetQuestionAggregateType<T extends QuestionAggregateArgs> = {
        [P in keyof T & keyof AggregateQuestion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuestion[P]>
      : GetScalarType<T[P], AggregateQuestion[P]>
  }




  export type QuestionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionWhereInput
    orderBy?: QuestionOrderByWithAggregationInput | QuestionOrderByWithAggregationInput[]
    by: QuestionScalarFieldEnum[] | QuestionScalarFieldEnum
    having?: QuestionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuestionCountAggregateInputType | true
    _avg?: QuestionAvgAggregateInputType
    _sum?: QuestionSumAggregateInputType
    _min?: QuestionMinAggregateInputType
    _max?: QuestionMaxAggregateInputType
  }

  export type QuestionGroupByOutputType = {
    id: string
    text: string
    type: $Enums.QuestionType
    options: string | null
    correctOption: number | null
    correctAnswer: string | null
    marks: number
    explanation: string | null
    order: number
    testId: string
    _count: QuestionCountAggregateOutputType | null
    _avg: QuestionAvgAggregateOutputType | null
    _sum: QuestionSumAggregateOutputType | null
    _min: QuestionMinAggregateOutputType | null
    _max: QuestionMaxAggregateOutputType | null
  }

  type GetQuestionGroupByPayload<T extends QuestionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuestionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuestionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuestionGroupByOutputType[P]>
            : GetScalarType<T[P], QuestionGroupByOutputType[P]>
        }
      >
    >


  export type QuestionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    type?: boolean
    options?: boolean
    correctOption?: boolean
    correctAnswer?: boolean
    marks?: boolean
    explanation?: boolean
    order?: boolean
    testId?: boolean
    test?: boolean | TestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question"]>

  export type QuestionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    type?: boolean
    options?: boolean
    correctOption?: boolean
    correctAnswer?: boolean
    marks?: boolean
    explanation?: boolean
    order?: boolean
    testId?: boolean
    test?: boolean | TestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question"]>

  export type QuestionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    type?: boolean
    options?: boolean
    correctOption?: boolean
    correctAnswer?: boolean
    marks?: boolean
    explanation?: boolean
    order?: boolean
    testId?: boolean
    test?: boolean | TestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question"]>

  export type QuestionSelectScalar = {
    id?: boolean
    text?: boolean
    type?: boolean
    options?: boolean
    correctOption?: boolean
    correctAnswer?: boolean
    marks?: boolean
    explanation?: boolean
    order?: boolean
    testId?: boolean
  }

  export type QuestionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "text" | "type" | "options" | "correctOption" | "correctAnswer" | "marks" | "explanation" | "order" | "testId", ExtArgs["result"]["question"]>
  export type QuestionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    test?: boolean | TestDefaultArgs<ExtArgs>
  }
  export type QuestionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    test?: boolean | TestDefaultArgs<ExtArgs>
  }
  export type QuestionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    test?: boolean | TestDefaultArgs<ExtArgs>
  }

  export type $QuestionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Question"
    objects: {
      test: Prisma.$TestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      text: string
      type: $Enums.QuestionType
      options: string | null
      correctOption: number | null
      correctAnswer: string | null
      marks: number
      explanation: string | null
      order: number
      testId: string
    }, ExtArgs["result"]["question"]>
    composites: {}
  }

  type QuestionGetPayload<S extends boolean | null | undefined | QuestionDefaultArgs> = $Result.GetResult<Prisma.$QuestionPayload, S>

  type QuestionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuestionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuestionCountAggregateInputType | true
    }

  export interface QuestionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Question'], meta: { name: 'Question' } }
    /**
     * Find zero or one Question that matches the filter.
     * @param {QuestionFindUniqueArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuestionFindUniqueArgs>(args: SelectSubset<T, QuestionFindUniqueArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Question that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuestionFindUniqueOrThrowArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuestionFindUniqueOrThrowArgs>(args: SelectSubset<T, QuestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Question that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindFirstArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuestionFindFirstArgs>(args?: SelectSubset<T, QuestionFindFirstArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Question that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindFirstOrThrowArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuestionFindFirstOrThrowArgs>(args?: SelectSubset<T, QuestionFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Questions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Questions
     * const questions = await prisma.question.findMany()
     * 
     * // Get first 10 Questions
     * const questions = await prisma.question.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const questionWithIdOnly = await prisma.question.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuestionFindManyArgs>(args?: SelectSubset<T, QuestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Question.
     * @param {QuestionCreateArgs} args - Arguments to create a Question.
     * @example
     * // Create one Question
     * const Question = await prisma.question.create({
     *   data: {
     *     // ... data to create a Question
     *   }
     * })
     * 
     */
    create<T extends QuestionCreateArgs>(args: SelectSubset<T, QuestionCreateArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Questions.
     * @param {QuestionCreateManyArgs} args - Arguments to create many Questions.
     * @example
     * // Create many Questions
     * const question = await prisma.question.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuestionCreateManyArgs>(args?: SelectSubset<T, QuestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Questions and returns the data saved in the database.
     * @param {QuestionCreateManyAndReturnArgs} args - Arguments to create many Questions.
     * @example
     * // Create many Questions
     * const question = await prisma.question.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Questions and only return the `id`
     * const questionWithIdOnly = await prisma.question.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuestionCreateManyAndReturnArgs>(args?: SelectSubset<T, QuestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Question.
     * @param {QuestionDeleteArgs} args - Arguments to delete one Question.
     * @example
     * // Delete one Question
     * const Question = await prisma.question.delete({
     *   where: {
     *     // ... filter to delete one Question
     *   }
     * })
     * 
     */
    delete<T extends QuestionDeleteArgs>(args: SelectSubset<T, QuestionDeleteArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Question.
     * @param {QuestionUpdateArgs} args - Arguments to update one Question.
     * @example
     * // Update one Question
     * const question = await prisma.question.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuestionUpdateArgs>(args: SelectSubset<T, QuestionUpdateArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Questions.
     * @param {QuestionDeleteManyArgs} args - Arguments to filter Questions to delete.
     * @example
     * // Delete a few Questions
     * const { count } = await prisma.question.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuestionDeleteManyArgs>(args?: SelectSubset<T, QuestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Questions
     * const question = await prisma.question.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuestionUpdateManyArgs>(args: SelectSubset<T, QuestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Questions and returns the data updated in the database.
     * @param {QuestionUpdateManyAndReturnArgs} args - Arguments to update many Questions.
     * @example
     * // Update many Questions
     * const question = await prisma.question.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Questions and only return the `id`
     * const questionWithIdOnly = await prisma.question.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QuestionUpdateManyAndReturnArgs>(args: SelectSubset<T, QuestionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Question.
     * @param {QuestionUpsertArgs} args - Arguments to update or create a Question.
     * @example
     * // Update or create a Question
     * const question = await prisma.question.upsert({
     *   create: {
     *     // ... data to create a Question
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Question we want to update
     *   }
     * })
     */
    upsert<T extends QuestionUpsertArgs>(args: SelectSubset<T, QuestionUpsertArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionCountArgs} args - Arguments to filter Questions to count.
     * @example
     * // Count the number of Questions
     * const count = await prisma.question.count({
     *   where: {
     *     // ... the filter for the Questions we want to count
     *   }
     * })
    **/
    count<T extends QuestionCountArgs>(
      args?: Subset<T, QuestionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuestionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Question.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuestionAggregateArgs>(args: Subset<T, QuestionAggregateArgs>): Prisma.PrismaPromise<GetQuestionAggregateType<T>>

    /**
     * Group by Question.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuestionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuestionGroupByArgs['orderBy'] }
        : { orderBy?: QuestionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Question model
   */
  readonly fields: QuestionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Question.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuestionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    test<T extends TestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TestDefaultArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Question model
   */
  interface QuestionFieldRefs {
    readonly id: FieldRef<"Question", 'String'>
    readonly text: FieldRef<"Question", 'String'>
    readonly type: FieldRef<"Question", 'QuestionType'>
    readonly options: FieldRef<"Question", 'String'>
    readonly correctOption: FieldRef<"Question", 'Int'>
    readonly correctAnswer: FieldRef<"Question", 'String'>
    readonly marks: FieldRef<"Question", 'Int'>
    readonly explanation: FieldRef<"Question", 'String'>
    readonly order: FieldRef<"Question", 'Int'>
    readonly testId: FieldRef<"Question", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Question findUnique
   */
  export type QuestionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question findUniqueOrThrow
   */
  export type QuestionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question findFirst
   */
  export type QuestionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Questions.
     */
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question findFirstOrThrow
   */
  export type QuestionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Questions.
     */
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question findMany
   */
  export type QuestionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Questions to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Questions.
     */
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question create
   */
  export type QuestionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The data needed to create a Question.
     */
    data: XOR<QuestionCreateInput, QuestionUncheckedCreateInput>
  }

  /**
   * Question createMany
   */
  export type QuestionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Questions.
     */
    data: QuestionCreateManyInput | QuestionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Question createManyAndReturn
   */
  export type QuestionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * The data used to create many Questions.
     */
    data: QuestionCreateManyInput | QuestionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Question update
   */
  export type QuestionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The data needed to update a Question.
     */
    data: XOR<QuestionUpdateInput, QuestionUncheckedUpdateInput>
    /**
     * Choose, which Question to update.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question updateMany
   */
  export type QuestionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Questions.
     */
    data: XOR<QuestionUpdateManyMutationInput, QuestionUncheckedUpdateManyInput>
    /**
     * Filter which Questions to update
     */
    where?: QuestionWhereInput
    /**
     * Limit how many Questions to update.
     */
    limit?: number
  }

  /**
   * Question updateManyAndReturn
   */
  export type QuestionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * The data used to update Questions.
     */
    data: XOR<QuestionUpdateManyMutationInput, QuestionUncheckedUpdateManyInput>
    /**
     * Filter which Questions to update
     */
    where?: QuestionWhereInput
    /**
     * Limit how many Questions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Question upsert
   */
  export type QuestionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The filter to search for the Question to update in case it exists.
     */
    where: QuestionWhereUniqueInput
    /**
     * In case the Question found by the `where` argument doesn't exist, create a new Question with this data.
     */
    create: XOR<QuestionCreateInput, QuestionUncheckedCreateInput>
    /**
     * In case the Question was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuestionUpdateInput, QuestionUncheckedUpdateInput>
  }

  /**
   * Question delete
   */
  export type QuestionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter which Question to delete.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question deleteMany
   */
  export type QuestionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Questions to delete
     */
    where?: QuestionWhereInput
    /**
     * Limit how many Questions to delete.
     */
    limit?: number
  }

  /**
   * Question without action
   */
  export type QuestionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
  }


  /**
   * Model TestScore
   */

  export type AggregateTestScore = {
    _count: TestScoreCountAggregateOutputType | null
    _avg: TestScoreAvgAggregateOutputType | null
    _sum: TestScoreSumAggregateOutputType | null
    _min: TestScoreMinAggregateOutputType | null
    _max: TestScoreMaxAggregateOutputType | null
  }

  export type TestScoreAvgAggregateOutputType = {
    score: number | null
    totalMarks: number | null
  }

  export type TestScoreSumAggregateOutputType = {
    score: number | null
    totalMarks: number | null
  }

  export type TestScoreMinAggregateOutputType = {
    id: string | null
    studentId: string | null
    testId: string | null
    score: number | null
    totalMarks: number | null
    passed: boolean | null
    remarks: string | null
    gradedAt: Date | null
    answers: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TestScoreMaxAggregateOutputType = {
    id: string | null
    studentId: string | null
    testId: string | null
    score: number | null
    totalMarks: number | null
    passed: boolean | null
    remarks: string | null
    gradedAt: Date | null
    answers: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TestScoreCountAggregateOutputType = {
    id: number
    studentId: number
    testId: number
    score: number
    totalMarks: number
    passed: number
    remarks: number
    gradedAt: number
    answers: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TestScoreAvgAggregateInputType = {
    score?: true
    totalMarks?: true
  }

  export type TestScoreSumAggregateInputType = {
    score?: true
    totalMarks?: true
  }

  export type TestScoreMinAggregateInputType = {
    id?: true
    studentId?: true
    testId?: true
    score?: true
    totalMarks?: true
    passed?: true
    remarks?: true
    gradedAt?: true
    answers?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TestScoreMaxAggregateInputType = {
    id?: true
    studentId?: true
    testId?: true
    score?: true
    totalMarks?: true
    passed?: true
    remarks?: true
    gradedAt?: true
    answers?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TestScoreCountAggregateInputType = {
    id?: true
    studentId?: true
    testId?: true
    score?: true
    totalMarks?: true
    passed?: true
    remarks?: true
    gradedAt?: true
    answers?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TestScoreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestScore to aggregate.
     */
    where?: TestScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestScores to fetch.
     */
    orderBy?: TestScoreOrderByWithRelationInput | TestScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TestScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TestScores
    **/
    _count?: true | TestScoreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TestScoreAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TestScoreSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TestScoreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TestScoreMaxAggregateInputType
  }

  export type GetTestScoreAggregateType<T extends TestScoreAggregateArgs> = {
        [P in keyof T & keyof AggregateTestScore]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTestScore[P]>
      : GetScalarType<T[P], AggregateTestScore[P]>
  }




  export type TestScoreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestScoreWhereInput
    orderBy?: TestScoreOrderByWithAggregationInput | TestScoreOrderByWithAggregationInput[]
    by: TestScoreScalarFieldEnum[] | TestScoreScalarFieldEnum
    having?: TestScoreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TestScoreCountAggregateInputType | true
    _avg?: TestScoreAvgAggregateInputType
    _sum?: TestScoreSumAggregateInputType
    _min?: TestScoreMinAggregateInputType
    _max?: TestScoreMaxAggregateInputType
  }

  export type TestScoreGroupByOutputType = {
    id: string
    studentId: string
    testId: string
    score: number
    totalMarks: number
    passed: boolean | null
    remarks: string | null
    gradedAt: Date | null
    answers: string
    createdAt: Date
    updatedAt: Date
    _count: TestScoreCountAggregateOutputType | null
    _avg: TestScoreAvgAggregateOutputType | null
    _sum: TestScoreSumAggregateOutputType | null
    _min: TestScoreMinAggregateOutputType | null
    _max: TestScoreMaxAggregateOutputType | null
  }

  type GetTestScoreGroupByPayload<T extends TestScoreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TestScoreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TestScoreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TestScoreGroupByOutputType[P]>
            : GetScalarType<T[P], TestScoreGroupByOutputType[P]>
        }
      >
    >


  export type TestScoreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    testId?: boolean
    score?: boolean
    totalMarks?: boolean
    passed?: boolean
    remarks?: boolean
    gradedAt?: boolean
    answers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    test?: boolean | TestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testScore"]>

  export type TestScoreSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    testId?: boolean
    score?: boolean
    totalMarks?: boolean
    passed?: boolean
    remarks?: boolean
    gradedAt?: boolean
    answers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    test?: boolean | TestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testScore"]>

  export type TestScoreSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    testId?: boolean
    score?: boolean
    totalMarks?: boolean
    passed?: boolean
    remarks?: boolean
    gradedAt?: boolean
    answers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    test?: boolean | TestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testScore"]>

  export type TestScoreSelectScalar = {
    id?: boolean
    studentId?: boolean
    testId?: boolean
    score?: boolean
    totalMarks?: boolean
    passed?: boolean
    remarks?: boolean
    gradedAt?: boolean
    answers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TestScoreOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "testId" | "score" | "totalMarks" | "passed" | "remarks" | "gradedAt" | "answers" | "createdAt" | "updatedAt", ExtArgs["result"]["testScore"]>
  export type TestScoreInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    test?: boolean | TestDefaultArgs<ExtArgs>
  }
  export type TestScoreIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    test?: boolean | TestDefaultArgs<ExtArgs>
  }
  export type TestScoreIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    test?: boolean | TestDefaultArgs<ExtArgs>
  }

  export type $TestScorePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TestScore"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
      test: Prisma.$TestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studentId: string
      testId: string
      score: number
      totalMarks: number
      passed: boolean | null
      remarks: string | null
      gradedAt: Date | null
      answers: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["testScore"]>
    composites: {}
  }

  type TestScoreGetPayload<S extends boolean | null | undefined | TestScoreDefaultArgs> = $Result.GetResult<Prisma.$TestScorePayload, S>

  type TestScoreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TestScoreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TestScoreCountAggregateInputType | true
    }

  export interface TestScoreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TestScore'], meta: { name: 'TestScore' } }
    /**
     * Find zero or one TestScore that matches the filter.
     * @param {TestScoreFindUniqueArgs} args - Arguments to find a TestScore
     * @example
     * // Get one TestScore
     * const testScore = await prisma.testScore.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TestScoreFindUniqueArgs>(args: SelectSubset<T, TestScoreFindUniqueArgs<ExtArgs>>): Prisma__TestScoreClient<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TestScore that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TestScoreFindUniqueOrThrowArgs} args - Arguments to find a TestScore
     * @example
     * // Get one TestScore
     * const testScore = await prisma.testScore.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TestScoreFindUniqueOrThrowArgs>(args: SelectSubset<T, TestScoreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TestScoreClient<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestScore that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestScoreFindFirstArgs} args - Arguments to find a TestScore
     * @example
     * // Get one TestScore
     * const testScore = await prisma.testScore.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TestScoreFindFirstArgs>(args?: SelectSubset<T, TestScoreFindFirstArgs<ExtArgs>>): Prisma__TestScoreClient<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestScore that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestScoreFindFirstOrThrowArgs} args - Arguments to find a TestScore
     * @example
     * // Get one TestScore
     * const testScore = await prisma.testScore.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TestScoreFindFirstOrThrowArgs>(args?: SelectSubset<T, TestScoreFindFirstOrThrowArgs<ExtArgs>>): Prisma__TestScoreClient<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TestScores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestScoreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TestScores
     * const testScores = await prisma.testScore.findMany()
     * 
     * // Get first 10 TestScores
     * const testScores = await prisma.testScore.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const testScoreWithIdOnly = await prisma.testScore.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TestScoreFindManyArgs>(args?: SelectSubset<T, TestScoreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TestScore.
     * @param {TestScoreCreateArgs} args - Arguments to create a TestScore.
     * @example
     * // Create one TestScore
     * const TestScore = await prisma.testScore.create({
     *   data: {
     *     // ... data to create a TestScore
     *   }
     * })
     * 
     */
    create<T extends TestScoreCreateArgs>(args: SelectSubset<T, TestScoreCreateArgs<ExtArgs>>): Prisma__TestScoreClient<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TestScores.
     * @param {TestScoreCreateManyArgs} args - Arguments to create many TestScores.
     * @example
     * // Create many TestScores
     * const testScore = await prisma.testScore.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TestScoreCreateManyArgs>(args?: SelectSubset<T, TestScoreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TestScores and returns the data saved in the database.
     * @param {TestScoreCreateManyAndReturnArgs} args - Arguments to create many TestScores.
     * @example
     * // Create many TestScores
     * const testScore = await prisma.testScore.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TestScores and only return the `id`
     * const testScoreWithIdOnly = await prisma.testScore.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TestScoreCreateManyAndReturnArgs>(args?: SelectSubset<T, TestScoreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TestScore.
     * @param {TestScoreDeleteArgs} args - Arguments to delete one TestScore.
     * @example
     * // Delete one TestScore
     * const TestScore = await prisma.testScore.delete({
     *   where: {
     *     // ... filter to delete one TestScore
     *   }
     * })
     * 
     */
    delete<T extends TestScoreDeleteArgs>(args: SelectSubset<T, TestScoreDeleteArgs<ExtArgs>>): Prisma__TestScoreClient<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TestScore.
     * @param {TestScoreUpdateArgs} args - Arguments to update one TestScore.
     * @example
     * // Update one TestScore
     * const testScore = await prisma.testScore.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TestScoreUpdateArgs>(args: SelectSubset<T, TestScoreUpdateArgs<ExtArgs>>): Prisma__TestScoreClient<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TestScores.
     * @param {TestScoreDeleteManyArgs} args - Arguments to filter TestScores to delete.
     * @example
     * // Delete a few TestScores
     * const { count } = await prisma.testScore.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TestScoreDeleteManyArgs>(args?: SelectSubset<T, TestScoreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestScores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestScoreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TestScores
     * const testScore = await prisma.testScore.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TestScoreUpdateManyArgs>(args: SelectSubset<T, TestScoreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestScores and returns the data updated in the database.
     * @param {TestScoreUpdateManyAndReturnArgs} args - Arguments to update many TestScores.
     * @example
     * // Update many TestScores
     * const testScore = await prisma.testScore.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TestScores and only return the `id`
     * const testScoreWithIdOnly = await prisma.testScore.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TestScoreUpdateManyAndReturnArgs>(args: SelectSubset<T, TestScoreUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TestScore.
     * @param {TestScoreUpsertArgs} args - Arguments to update or create a TestScore.
     * @example
     * // Update or create a TestScore
     * const testScore = await prisma.testScore.upsert({
     *   create: {
     *     // ... data to create a TestScore
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TestScore we want to update
     *   }
     * })
     */
    upsert<T extends TestScoreUpsertArgs>(args: SelectSubset<T, TestScoreUpsertArgs<ExtArgs>>): Prisma__TestScoreClient<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TestScores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestScoreCountArgs} args - Arguments to filter TestScores to count.
     * @example
     * // Count the number of TestScores
     * const count = await prisma.testScore.count({
     *   where: {
     *     // ... the filter for the TestScores we want to count
     *   }
     * })
    **/
    count<T extends TestScoreCountArgs>(
      args?: Subset<T, TestScoreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TestScoreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TestScore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestScoreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TestScoreAggregateArgs>(args: Subset<T, TestScoreAggregateArgs>): Prisma.PrismaPromise<GetTestScoreAggregateType<T>>

    /**
     * Group by TestScore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestScoreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TestScoreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TestScoreGroupByArgs['orderBy'] }
        : { orderBy?: TestScoreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TestScoreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestScoreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TestScore model
   */
  readonly fields: TestScoreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TestScore.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TestScoreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    test<T extends TestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TestDefaultArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TestScore model
   */
  interface TestScoreFieldRefs {
    readonly id: FieldRef<"TestScore", 'String'>
    readonly studentId: FieldRef<"TestScore", 'String'>
    readonly testId: FieldRef<"TestScore", 'String'>
    readonly score: FieldRef<"TestScore", 'Int'>
    readonly totalMarks: FieldRef<"TestScore", 'Int'>
    readonly passed: FieldRef<"TestScore", 'Boolean'>
    readonly remarks: FieldRef<"TestScore", 'String'>
    readonly gradedAt: FieldRef<"TestScore", 'DateTime'>
    readonly answers: FieldRef<"TestScore", 'String'>
    readonly createdAt: FieldRef<"TestScore", 'DateTime'>
    readonly updatedAt: FieldRef<"TestScore", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TestScore findUnique
   */
  export type TestScoreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
    /**
     * Filter, which TestScore to fetch.
     */
    where: TestScoreWhereUniqueInput
  }

  /**
   * TestScore findUniqueOrThrow
   */
  export type TestScoreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
    /**
     * Filter, which TestScore to fetch.
     */
    where: TestScoreWhereUniqueInput
  }

  /**
   * TestScore findFirst
   */
  export type TestScoreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
    /**
     * Filter, which TestScore to fetch.
     */
    where?: TestScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestScores to fetch.
     */
    orderBy?: TestScoreOrderByWithRelationInput | TestScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestScores.
     */
    cursor?: TestScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestScores.
     */
    distinct?: TestScoreScalarFieldEnum | TestScoreScalarFieldEnum[]
  }

  /**
   * TestScore findFirstOrThrow
   */
  export type TestScoreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
    /**
     * Filter, which TestScore to fetch.
     */
    where?: TestScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestScores to fetch.
     */
    orderBy?: TestScoreOrderByWithRelationInput | TestScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestScores.
     */
    cursor?: TestScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestScores.
     */
    distinct?: TestScoreScalarFieldEnum | TestScoreScalarFieldEnum[]
  }

  /**
   * TestScore findMany
   */
  export type TestScoreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
    /**
     * Filter, which TestScores to fetch.
     */
    where?: TestScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestScores to fetch.
     */
    orderBy?: TestScoreOrderByWithRelationInput | TestScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TestScores.
     */
    cursor?: TestScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestScores.
     */
    distinct?: TestScoreScalarFieldEnum | TestScoreScalarFieldEnum[]
  }

  /**
   * TestScore create
   */
  export type TestScoreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
    /**
     * The data needed to create a TestScore.
     */
    data: XOR<TestScoreCreateInput, TestScoreUncheckedCreateInput>
  }

  /**
   * TestScore createMany
   */
  export type TestScoreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TestScores.
     */
    data: TestScoreCreateManyInput | TestScoreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TestScore createManyAndReturn
   */
  export type TestScoreCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * The data used to create many TestScores.
     */
    data: TestScoreCreateManyInput | TestScoreCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TestScore update
   */
  export type TestScoreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
    /**
     * The data needed to update a TestScore.
     */
    data: XOR<TestScoreUpdateInput, TestScoreUncheckedUpdateInput>
    /**
     * Choose, which TestScore to update.
     */
    where: TestScoreWhereUniqueInput
  }

  /**
   * TestScore updateMany
   */
  export type TestScoreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TestScores.
     */
    data: XOR<TestScoreUpdateManyMutationInput, TestScoreUncheckedUpdateManyInput>
    /**
     * Filter which TestScores to update
     */
    where?: TestScoreWhereInput
    /**
     * Limit how many TestScores to update.
     */
    limit?: number
  }

  /**
   * TestScore updateManyAndReturn
   */
  export type TestScoreUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * The data used to update TestScores.
     */
    data: XOR<TestScoreUpdateManyMutationInput, TestScoreUncheckedUpdateManyInput>
    /**
     * Filter which TestScores to update
     */
    where?: TestScoreWhereInput
    /**
     * Limit how many TestScores to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TestScore upsert
   */
  export type TestScoreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
    /**
     * The filter to search for the TestScore to update in case it exists.
     */
    where: TestScoreWhereUniqueInput
    /**
     * In case the TestScore found by the `where` argument doesn't exist, create a new TestScore with this data.
     */
    create: XOR<TestScoreCreateInput, TestScoreUncheckedCreateInput>
    /**
     * In case the TestScore was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TestScoreUpdateInput, TestScoreUncheckedUpdateInput>
  }

  /**
   * TestScore delete
   */
  export type TestScoreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
    /**
     * Filter which TestScore to delete.
     */
    where: TestScoreWhereUniqueInput
  }

  /**
   * TestScore deleteMany
   */
  export type TestScoreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestScores to delete
     */
    where?: TestScoreWhereInput
    /**
     * Limit how many TestScores to delete.
     */
    limit?: number
  }

  /**
   * TestScore without action
   */
  export type TestScoreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    username: 'username',
    passwordHash: 'passwordHash',
    uniqueId: 'uniqueId',
    image: 'image',
    gender: 'gender',
    phone: 'phone',
    city: 'city',
    accountId: 'accountId',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const LoginSessionScalarFieldEnum: {
    id: 'id',
    token: 'token',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    userId: 'userId'
  };

  export type LoginSessionScalarFieldEnum = (typeof LoginSessionScalarFieldEnum)[keyof typeof LoginSessionScalarFieldEnum]


  export const StudentScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    createdById: 'createdById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StudentScalarFieldEnum = (typeof StudentScalarFieldEnum)[keyof typeof StudentScalarFieldEnum]


  export const TestScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    subjectName: 'subjectName',
    totalMarks: 'totalMarks',
    numberOfQuestions: 'numberOfQuestions',
    difficulty: 'difficulty',
    slug: 'slug',
    settings: 'settings',
    visibility: 'visibility',
    isScheduled: 'isScheduled',
    startTime: 'startTime',
    duration: 'duration',
    allowRetake: 'allowRetake',
    showResults: 'showResults',
    createdById: 'createdById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TestScalarFieldEnum = (typeof TestScalarFieldEnum)[keyof typeof TestScalarFieldEnum]


  export const LiveTestAttemptScalarFieldEnum: {
    id: 'id',
    testId: 'testId',
    studentId: 'studentId',
    passwordUsed: 'passwordUsed',
    setupCompleted: 'setupCompleted',
    startedAt: 'startedAt',
    examStartedAt: 'examStartedAt',
    submittedAt: 'submittedAt',
    answers: 'answers',
    flagged: 'flagged',
    score: 'score',
    totalMarks: 'totalMarks',
    violationFlags: 'violationFlags',
    proctorDeductions: 'proctorDeductions',
    timePenaltySeconds: 'timePenaltySeconds',
    examCurrentIndex: 'examCurrentIndex',
    endedByProctor: 'endedByProctor',
    endReason: 'endReason',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LiveTestAttemptScalarFieldEnum = (typeof LiveTestAttemptScalarFieldEnum)[keyof typeof LiveTestAttemptScalarFieldEnum]


  export const LiveProctorFlagScalarFieldEnum: {
    id: 'id',
    testId: 'testId',
    studentId: 'studentId',
    attemptId: 'attemptId',
    proctorId: 'proctorId',
    note: 'note',
    createdAt: 'createdAt'
  };

  export type LiveProctorFlagScalarFieldEnum = (typeof LiveProctorFlagScalarFieldEnum)[keyof typeof LiveProctorFlagScalarFieldEnum]


  export const QuestionScalarFieldEnum: {
    id: 'id',
    text: 'text',
    type: 'type',
    options: 'options',
    correctOption: 'correctOption',
    correctAnswer: 'correctAnswer',
    marks: 'marks',
    explanation: 'explanation',
    order: 'order',
    testId: 'testId'
  };

  export type QuestionScalarFieldEnum = (typeof QuestionScalarFieldEnum)[keyof typeof QuestionScalarFieldEnum]


  export const TestScoreScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    testId: 'testId',
    score: 'score',
    totalMarks: 'totalMarks',
    passed: 'passed',
    remarks: 'remarks',
    gradedAt: 'gradedAt',
    answers: 'answers',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TestScoreScalarFieldEnum = (typeof TestScoreScalarFieldEnum)[keyof typeof TestScoreScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Gender'
   */
  export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>
    


  /**
   * Reference to a field of type 'Gender[]'
   */
  export type ListEnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Difficulty'
   */
  export type EnumDifficultyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Difficulty'>
    


  /**
   * Reference to a field of type 'Difficulty[]'
   */
  export type ListEnumDifficultyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Difficulty[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'QuestionType'
   */
  export type EnumQuestionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuestionType'>
    


  /**
   * Reference to a field of type 'QuestionType[]'
   */
  export type ListEnumQuestionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuestionType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    username?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringNullableFilter<"User"> | string | null
    uniqueId?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    gender?: EnumGenderFilter<"User"> | $Enums.Gender
    phone?: StringNullableFilter<"User"> | string | null
    city?: StringNullableFilter<"User"> | string | null
    accountId?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    tests?: TestListRelationFilter
    studentsCreated?: StudentListRelationFilter
    proctorFlags?: LiveProctorFlagListRelationFilter
    sessions?: LoginSessionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    username?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
    uniqueId?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    gender?: SortOrder
    phone?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    accountId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tests?: TestOrderByRelationAggregateInput
    studentsCreated?: StudentOrderByRelationAggregateInput
    proctorFlags?: LiveProctorFlagOrderByRelationAggregateInput
    sessions?: LoginSessionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    username?: string
    uniqueId?: string
    accountId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    gender?: EnumGenderFilter<"User"> | $Enums.Gender
    phone?: StringNullableFilter<"User"> | string | null
    city?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    tests?: TestListRelationFilter
    studentsCreated?: StudentListRelationFilter
    proctorFlags?: LiveProctorFlagListRelationFilter
    sessions?: LoginSessionListRelationFilter
  }, "id" | "email" | "username" | "uniqueId" | "accountId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    username?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
    uniqueId?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    gender?: SortOrder
    phone?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    accountId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    username?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordHash?: StringNullableWithAggregatesFilter<"User"> | string | null
    uniqueId?: StringNullableWithAggregatesFilter<"User"> | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    gender?: EnumGenderWithAggregatesFilter<"User"> | $Enums.Gender
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    city?: StringNullableWithAggregatesFilter<"User"> | string | null
    accountId?: StringWithAggregatesFilter<"User"> | string
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type LoginSessionWhereInput = {
    AND?: LoginSessionWhereInput | LoginSessionWhereInput[]
    OR?: LoginSessionWhereInput[]
    NOT?: LoginSessionWhereInput | LoginSessionWhereInput[]
    id?: StringFilter<"LoginSession"> | string
    token?: StringFilter<"LoginSession"> | string
    expiresAt?: DateTimeFilter<"LoginSession"> | Date | string
    createdAt?: DateTimeFilter<"LoginSession"> | Date | string
    userId?: StringFilter<"LoginSession"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type LoginSessionOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type LoginSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: LoginSessionWhereInput | LoginSessionWhereInput[]
    OR?: LoginSessionWhereInput[]
    NOT?: LoginSessionWhereInput | LoginSessionWhereInput[]
    expiresAt?: DateTimeFilter<"LoginSession"> | Date | string
    createdAt?: DateTimeFilter<"LoginSession"> | Date | string
    userId?: StringFilter<"LoginSession"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type LoginSessionOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    _count?: LoginSessionCountOrderByAggregateInput
    _max?: LoginSessionMaxOrderByAggregateInput
    _min?: LoginSessionMinOrderByAggregateInput
  }

  export type LoginSessionScalarWhereWithAggregatesInput = {
    AND?: LoginSessionScalarWhereWithAggregatesInput | LoginSessionScalarWhereWithAggregatesInput[]
    OR?: LoginSessionScalarWhereWithAggregatesInput[]
    NOT?: LoginSessionScalarWhereWithAggregatesInput | LoginSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LoginSession"> | string
    token?: StringWithAggregatesFilter<"LoginSession"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"LoginSession"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"LoginSession"> | Date | string
    userId?: StringWithAggregatesFilter<"LoginSession"> | string
  }

  export type StudentWhereInput = {
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    id?: StringFilter<"Student"> | string
    firstName?: StringFilter<"Student"> | string
    lastName?: StringFilter<"Student"> | string
    email?: StringFilter<"Student"> | string
    createdById?: StringFilter<"Student"> | string
    createdAt?: DateTimeFilter<"Student"> | Date | string
    updatedAt?: DateTimeFilter<"Student"> | Date | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    testScores?: TestScoreListRelationFilter
    liveAttempts?: LiveTestAttemptListRelationFilter
    proctorFlags?: LiveProctorFlagListRelationFilter
  }

  export type StudentOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: UserOrderByWithRelationInput
    testScores?: TestScoreOrderByRelationAggregateInput
    liveAttempts?: LiveTestAttemptOrderByRelationAggregateInput
    proctorFlags?: LiveProctorFlagOrderByRelationAggregateInput
  }

  export type StudentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    firstName?: StringFilter<"Student"> | string
    lastName?: StringFilter<"Student"> | string
    createdById?: StringFilter<"Student"> | string
    createdAt?: DateTimeFilter<"Student"> | Date | string
    updatedAt?: DateTimeFilter<"Student"> | Date | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    testScores?: TestScoreListRelationFilter
    liveAttempts?: LiveTestAttemptListRelationFilter
    proctorFlags?: LiveProctorFlagListRelationFilter
  }, "id" | "email">

  export type StudentOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StudentCountOrderByAggregateInput
    _max?: StudentMaxOrderByAggregateInput
    _min?: StudentMinOrderByAggregateInput
  }

  export type StudentScalarWhereWithAggregatesInput = {
    AND?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    OR?: StudentScalarWhereWithAggregatesInput[]
    NOT?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Student"> | string
    firstName?: StringWithAggregatesFilter<"Student"> | string
    lastName?: StringWithAggregatesFilter<"Student"> | string
    email?: StringWithAggregatesFilter<"Student"> | string
    createdById?: StringWithAggregatesFilter<"Student"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Student"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Student"> | Date | string
  }

  export type TestWhereInput = {
    AND?: TestWhereInput | TestWhereInput[]
    OR?: TestWhereInput[]
    NOT?: TestWhereInput | TestWhereInput[]
    id?: StringFilter<"Test"> | string
    name?: StringFilter<"Test"> | string
    description?: StringNullableFilter<"Test"> | string | null
    subjectName?: StringFilter<"Test"> | string
    totalMarks?: IntNullableFilter<"Test"> | number | null
    numberOfQuestions?: IntNullableFilter<"Test"> | number | null
    difficulty?: EnumDifficultyFilter<"Test"> | $Enums.Difficulty
    slug?: StringFilter<"Test"> | string
    settings?: StringFilter<"Test"> | string
    visibility?: BoolFilter<"Test"> | boolean
    isScheduled?: BoolFilter<"Test"> | boolean
    startTime?: DateTimeNullableFilter<"Test"> | Date | string | null
    duration?: IntNullableFilter<"Test"> | number | null
    allowRetake?: BoolFilter<"Test"> | boolean
    showResults?: BoolFilter<"Test"> | boolean
    createdById?: StringFilter<"Test"> | string
    createdAt?: DateTimeFilter<"Test"> | Date | string
    updatedAt?: DateTimeFilter<"Test"> | Date | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    questions?: QuestionListRelationFilter
    testScores?: TestScoreListRelationFilter
    liveAttempts?: LiveTestAttemptListRelationFilter
    proctorFlags?: LiveProctorFlagListRelationFilter
  }

  export type TestOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    subjectName?: SortOrder
    totalMarks?: SortOrderInput | SortOrder
    numberOfQuestions?: SortOrderInput | SortOrder
    difficulty?: SortOrder
    slug?: SortOrder
    settings?: SortOrder
    visibility?: SortOrder
    isScheduled?: SortOrder
    startTime?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    allowRetake?: SortOrder
    showResults?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: UserOrderByWithRelationInput
    questions?: QuestionOrderByRelationAggregateInput
    testScores?: TestScoreOrderByRelationAggregateInput
    liveAttempts?: LiveTestAttemptOrderByRelationAggregateInput
    proctorFlags?: LiveProctorFlagOrderByRelationAggregateInput
  }

  export type TestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: TestWhereInput | TestWhereInput[]
    OR?: TestWhereInput[]
    NOT?: TestWhereInput | TestWhereInput[]
    name?: StringFilter<"Test"> | string
    description?: StringNullableFilter<"Test"> | string | null
    subjectName?: StringFilter<"Test"> | string
    totalMarks?: IntNullableFilter<"Test"> | number | null
    numberOfQuestions?: IntNullableFilter<"Test"> | number | null
    difficulty?: EnumDifficultyFilter<"Test"> | $Enums.Difficulty
    settings?: StringFilter<"Test"> | string
    visibility?: BoolFilter<"Test"> | boolean
    isScheduled?: BoolFilter<"Test"> | boolean
    startTime?: DateTimeNullableFilter<"Test"> | Date | string | null
    duration?: IntNullableFilter<"Test"> | number | null
    allowRetake?: BoolFilter<"Test"> | boolean
    showResults?: BoolFilter<"Test"> | boolean
    createdById?: StringFilter<"Test"> | string
    createdAt?: DateTimeFilter<"Test"> | Date | string
    updatedAt?: DateTimeFilter<"Test"> | Date | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    questions?: QuestionListRelationFilter
    testScores?: TestScoreListRelationFilter
    liveAttempts?: LiveTestAttemptListRelationFilter
    proctorFlags?: LiveProctorFlagListRelationFilter
  }, "id" | "slug">

  export type TestOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    subjectName?: SortOrder
    totalMarks?: SortOrderInput | SortOrder
    numberOfQuestions?: SortOrderInput | SortOrder
    difficulty?: SortOrder
    slug?: SortOrder
    settings?: SortOrder
    visibility?: SortOrder
    isScheduled?: SortOrder
    startTime?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    allowRetake?: SortOrder
    showResults?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TestCountOrderByAggregateInput
    _avg?: TestAvgOrderByAggregateInput
    _max?: TestMaxOrderByAggregateInput
    _min?: TestMinOrderByAggregateInput
    _sum?: TestSumOrderByAggregateInput
  }

  export type TestScalarWhereWithAggregatesInput = {
    AND?: TestScalarWhereWithAggregatesInput | TestScalarWhereWithAggregatesInput[]
    OR?: TestScalarWhereWithAggregatesInput[]
    NOT?: TestScalarWhereWithAggregatesInput | TestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Test"> | string
    name?: StringWithAggregatesFilter<"Test"> | string
    description?: StringNullableWithAggregatesFilter<"Test"> | string | null
    subjectName?: StringWithAggregatesFilter<"Test"> | string
    totalMarks?: IntNullableWithAggregatesFilter<"Test"> | number | null
    numberOfQuestions?: IntNullableWithAggregatesFilter<"Test"> | number | null
    difficulty?: EnumDifficultyWithAggregatesFilter<"Test"> | $Enums.Difficulty
    slug?: StringWithAggregatesFilter<"Test"> | string
    settings?: StringWithAggregatesFilter<"Test"> | string
    visibility?: BoolWithAggregatesFilter<"Test"> | boolean
    isScheduled?: BoolWithAggregatesFilter<"Test"> | boolean
    startTime?: DateTimeNullableWithAggregatesFilter<"Test"> | Date | string | null
    duration?: IntNullableWithAggregatesFilter<"Test"> | number | null
    allowRetake?: BoolWithAggregatesFilter<"Test"> | boolean
    showResults?: BoolWithAggregatesFilter<"Test"> | boolean
    createdById?: StringWithAggregatesFilter<"Test"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Test"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Test"> | Date | string
  }

  export type LiveTestAttemptWhereInput = {
    AND?: LiveTestAttemptWhereInput | LiveTestAttemptWhereInput[]
    OR?: LiveTestAttemptWhereInput[]
    NOT?: LiveTestAttemptWhereInput | LiveTestAttemptWhereInput[]
    id?: StringFilter<"LiveTestAttempt"> | string
    testId?: StringFilter<"LiveTestAttempt"> | string
    studentId?: StringFilter<"LiveTestAttempt"> | string
    passwordUsed?: BoolFilter<"LiveTestAttempt"> | boolean
    setupCompleted?: BoolFilter<"LiveTestAttempt"> | boolean
    startedAt?: DateTimeFilter<"LiveTestAttempt"> | Date | string
    examStartedAt?: DateTimeNullableFilter<"LiveTestAttempt"> | Date | string | null
    submittedAt?: DateTimeNullableFilter<"LiveTestAttempt"> | Date | string | null
    answers?: StringFilter<"LiveTestAttempt"> | string
    flagged?: StringFilter<"LiveTestAttempt"> | string
    score?: IntNullableFilter<"LiveTestAttempt"> | number | null
    totalMarks?: IntNullableFilter<"LiveTestAttempt"> | number | null
    violationFlags?: JsonFilter<"LiveTestAttempt">
    proctorDeductions?: IntFilter<"LiveTestAttempt"> | number
    timePenaltySeconds?: IntFilter<"LiveTestAttempt"> | number
    examCurrentIndex?: IntFilter<"LiveTestAttempt"> | number
    endedByProctor?: BoolFilter<"LiveTestAttempt"> | boolean
    endReason?: StringNullableFilter<"LiveTestAttempt"> | string | null
    createdAt?: DateTimeFilter<"LiveTestAttempt"> | Date | string
    updatedAt?: DateTimeFilter<"LiveTestAttempt"> | Date | string
    test?: XOR<TestScalarRelationFilter, TestWhereInput>
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    proctorFlags?: LiveProctorFlagListRelationFilter
  }

  export type LiveTestAttemptOrderByWithRelationInput = {
    id?: SortOrder
    testId?: SortOrder
    studentId?: SortOrder
    passwordUsed?: SortOrder
    setupCompleted?: SortOrder
    startedAt?: SortOrder
    examStartedAt?: SortOrderInput | SortOrder
    submittedAt?: SortOrderInput | SortOrder
    answers?: SortOrder
    flagged?: SortOrder
    score?: SortOrderInput | SortOrder
    totalMarks?: SortOrderInput | SortOrder
    violationFlags?: SortOrder
    proctorDeductions?: SortOrder
    timePenaltySeconds?: SortOrder
    examCurrentIndex?: SortOrder
    endedByProctor?: SortOrder
    endReason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    test?: TestOrderByWithRelationInput
    student?: StudentOrderByWithRelationInput
    proctorFlags?: LiveProctorFlagOrderByRelationAggregateInput
  }

  export type LiveTestAttemptWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LiveTestAttemptWhereInput | LiveTestAttemptWhereInput[]
    OR?: LiveTestAttemptWhereInput[]
    NOT?: LiveTestAttemptWhereInput | LiveTestAttemptWhereInput[]
    testId?: StringFilter<"LiveTestAttempt"> | string
    studentId?: StringFilter<"LiveTestAttempt"> | string
    passwordUsed?: BoolFilter<"LiveTestAttempt"> | boolean
    setupCompleted?: BoolFilter<"LiveTestAttempt"> | boolean
    startedAt?: DateTimeFilter<"LiveTestAttempt"> | Date | string
    examStartedAt?: DateTimeNullableFilter<"LiveTestAttempt"> | Date | string | null
    submittedAt?: DateTimeNullableFilter<"LiveTestAttempt"> | Date | string | null
    answers?: StringFilter<"LiveTestAttempt"> | string
    flagged?: StringFilter<"LiveTestAttempt"> | string
    score?: IntNullableFilter<"LiveTestAttempt"> | number | null
    totalMarks?: IntNullableFilter<"LiveTestAttempt"> | number | null
    violationFlags?: JsonFilter<"LiveTestAttempt">
    proctorDeductions?: IntFilter<"LiveTestAttempt"> | number
    timePenaltySeconds?: IntFilter<"LiveTestAttempt"> | number
    examCurrentIndex?: IntFilter<"LiveTestAttempt"> | number
    endedByProctor?: BoolFilter<"LiveTestAttempt"> | boolean
    endReason?: StringNullableFilter<"LiveTestAttempt"> | string | null
    createdAt?: DateTimeFilter<"LiveTestAttempt"> | Date | string
    updatedAt?: DateTimeFilter<"LiveTestAttempt"> | Date | string
    test?: XOR<TestScalarRelationFilter, TestWhereInput>
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    proctorFlags?: LiveProctorFlagListRelationFilter
  }, "id">

  export type LiveTestAttemptOrderByWithAggregationInput = {
    id?: SortOrder
    testId?: SortOrder
    studentId?: SortOrder
    passwordUsed?: SortOrder
    setupCompleted?: SortOrder
    startedAt?: SortOrder
    examStartedAt?: SortOrderInput | SortOrder
    submittedAt?: SortOrderInput | SortOrder
    answers?: SortOrder
    flagged?: SortOrder
    score?: SortOrderInput | SortOrder
    totalMarks?: SortOrderInput | SortOrder
    violationFlags?: SortOrder
    proctorDeductions?: SortOrder
    timePenaltySeconds?: SortOrder
    examCurrentIndex?: SortOrder
    endedByProctor?: SortOrder
    endReason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LiveTestAttemptCountOrderByAggregateInput
    _avg?: LiveTestAttemptAvgOrderByAggregateInput
    _max?: LiveTestAttemptMaxOrderByAggregateInput
    _min?: LiveTestAttemptMinOrderByAggregateInput
    _sum?: LiveTestAttemptSumOrderByAggregateInput
  }

  export type LiveTestAttemptScalarWhereWithAggregatesInput = {
    AND?: LiveTestAttemptScalarWhereWithAggregatesInput | LiveTestAttemptScalarWhereWithAggregatesInput[]
    OR?: LiveTestAttemptScalarWhereWithAggregatesInput[]
    NOT?: LiveTestAttemptScalarWhereWithAggregatesInput | LiveTestAttemptScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LiveTestAttempt"> | string
    testId?: StringWithAggregatesFilter<"LiveTestAttempt"> | string
    studentId?: StringWithAggregatesFilter<"LiveTestAttempt"> | string
    passwordUsed?: BoolWithAggregatesFilter<"LiveTestAttempt"> | boolean
    setupCompleted?: BoolWithAggregatesFilter<"LiveTestAttempt"> | boolean
    startedAt?: DateTimeWithAggregatesFilter<"LiveTestAttempt"> | Date | string
    examStartedAt?: DateTimeNullableWithAggregatesFilter<"LiveTestAttempt"> | Date | string | null
    submittedAt?: DateTimeNullableWithAggregatesFilter<"LiveTestAttempt"> | Date | string | null
    answers?: StringWithAggregatesFilter<"LiveTestAttempt"> | string
    flagged?: StringWithAggregatesFilter<"LiveTestAttempt"> | string
    score?: IntNullableWithAggregatesFilter<"LiveTestAttempt"> | number | null
    totalMarks?: IntNullableWithAggregatesFilter<"LiveTestAttempt"> | number | null
    violationFlags?: JsonWithAggregatesFilter<"LiveTestAttempt">
    proctorDeductions?: IntWithAggregatesFilter<"LiveTestAttempt"> | number
    timePenaltySeconds?: IntWithAggregatesFilter<"LiveTestAttempt"> | number
    examCurrentIndex?: IntWithAggregatesFilter<"LiveTestAttempt"> | number
    endedByProctor?: BoolWithAggregatesFilter<"LiveTestAttempt"> | boolean
    endReason?: StringNullableWithAggregatesFilter<"LiveTestAttempt"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"LiveTestAttempt"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LiveTestAttempt"> | Date | string
  }

  export type LiveProctorFlagWhereInput = {
    AND?: LiveProctorFlagWhereInput | LiveProctorFlagWhereInput[]
    OR?: LiveProctorFlagWhereInput[]
    NOT?: LiveProctorFlagWhereInput | LiveProctorFlagWhereInput[]
    id?: StringFilter<"LiveProctorFlag"> | string
    testId?: StringFilter<"LiveProctorFlag"> | string
    studentId?: StringFilter<"LiveProctorFlag"> | string
    attemptId?: StringNullableFilter<"LiveProctorFlag"> | string | null
    proctorId?: StringFilter<"LiveProctorFlag"> | string
    note?: StringNullableFilter<"LiveProctorFlag"> | string | null
    createdAt?: DateTimeFilter<"LiveProctorFlag"> | Date | string
    test?: XOR<TestScalarRelationFilter, TestWhereInput>
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    attempt?: XOR<LiveTestAttemptNullableScalarRelationFilter, LiveTestAttemptWhereInput> | null
    proctor?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type LiveProctorFlagOrderByWithRelationInput = {
    id?: SortOrder
    testId?: SortOrder
    studentId?: SortOrder
    attemptId?: SortOrderInput | SortOrder
    proctorId?: SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    test?: TestOrderByWithRelationInput
    student?: StudentOrderByWithRelationInput
    attempt?: LiveTestAttemptOrderByWithRelationInput
    proctor?: UserOrderByWithRelationInput
  }

  export type LiveProctorFlagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LiveProctorFlagWhereInput | LiveProctorFlagWhereInput[]
    OR?: LiveProctorFlagWhereInput[]
    NOT?: LiveProctorFlagWhereInput | LiveProctorFlagWhereInput[]
    testId?: StringFilter<"LiveProctorFlag"> | string
    studentId?: StringFilter<"LiveProctorFlag"> | string
    attemptId?: StringNullableFilter<"LiveProctorFlag"> | string | null
    proctorId?: StringFilter<"LiveProctorFlag"> | string
    note?: StringNullableFilter<"LiveProctorFlag"> | string | null
    createdAt?: DateTimeFilter<"LiveProctorFlag"> | Date | string
    test?: XOR<TestScalarRelationFilter, TestWhereInput>
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    attempt?: XOR<LiveTestAttemptNullableScalarRelationFilter, LiveTestAttemptWhereInput> | null
    proctor?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type LiveProctorFlagOrderByWithAggregationInput = {
    id?: SortOrder
    testId?: SortOrder
    studentId?: SortOrder
    attemptId?: SortOrderInput | SortOrder
    proctorId?: SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: LiveProctorFlagCountOrderByAggregateInput
    _max?: LiveProctorFlagMaxOrderByAggregateInput
    _min?: LiveProctorFlagMinOrderByAggregateInput
  }

  export type LiveProctorFlagScalarWhereWithAggregatesInput = {
    AND?: LiveProctorFlagScalarWhereWithAggregatesInput | LiveProctorFlagScalarWhereWithAggregatesInput[]
    OR?: LiveProctorFlagScalarWhereWithAggregatesInput[]
    NOT?: LiveProctorFlagScalarWhereWithAggregatesInput | LiveProctorFlagScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LiveProctorFlag"> | string
    testId?: StringWithAggregatesFilter<"LiveProctorFlag"> | string
    studentId?: StringWithAggregatesFilter<"LiveProctorFlag"> | string
    attemptId?: StringNullableWithAggregatesFilter<"LiveProctorFlag"> | string | null
    proctorId?: StringWithAggregatesFilter<"LiveProctorFlag"> | string
    note?: StringNullableWithAggregatesFilter<"LiveProctorFlag"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"LiveProctorFlag"> | Date | string
  }

  export type QuestionWhereInput = {
    AND?: QuestionWhereInput | QuestionWhereInput[]
    OR?: QuestionWhereInput[]
    NOT?: QuestionWhereInput | QuestionWhereInput[]
    id?: StringFilter<"Question"> | string
    text?: StringFilter<"Question"> | string
    type?: EnumQuestionTypeFilter<"Question"> | $Enums.QuestionType
    options?: StringNullableFilter<"Question"> | string | null
    correctOption?: IntNullableFilter<"Question"> | number | null
    correctAnswer?: StringNullableFilter<"Question"> | string | null
    marks?: IntFilter<"Question"> | number
    explanation?: StringNullableFilter<"Question"> | string | null
    order?: IntFilter<"Question"> | number
    testId?: StringFilter<"Question"> | string
    test?: XOR<TestScalarRelationFilter, TestWhereInput>
  }

  export type QuestionOrderByWithRelationInput = {
    id?: SortOrder
    text?: SortOrder
    type?: SortOrder
    options?: SortOrderInput | SortOrder
    correctOption?: SortOrderInput | SortOrder
    correctAnswer?: SortOrderInput | SortOrder
    marks?: SortOrder
    explanation?: SortOrderInput | SortOrder
    order?: SortOrder
    testId?: SortOrder
    test?: TestOrderByWithRelationInput
  }

  export type QuestionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QuestionWhereInput | QuestionWhereInput[]
    OR?: QuestionWhereInput[]
    NOT?: QuestionWhereInput | QuestionWhereInput[]
    text?: StringFilter<"Question"> | string
    type?: EnumQuestionTypeFilter<"Question"> | $Enums.QuestionType
    options?: StringNullableFilter<"Question"> | string | null
    correctOption?: IntNullableFilter<"Question"> | number | null
    correctAnswer?: StringNullableFilter<"Question"> | string | null
    marks?: IntFilter<"Question"> | number
    explanation?: StringNullableFilter<"Question"> | string | null
    order?: IntFilter<"Question"> | number
    testId?: StringFilter<"Question"> | string
    test?: XOR<TestScalarRelationFilter, TestWhereInput>
  }, "id">

  export type QuestionOrderByWithAggregationInput = {
    id?: SortOrder
    text?: SortOrder
    type?: SortOrder
    options?: SortOrderInput | SortOrder
    correctOption?: SortOrderInput | SortOrder
    correctAnswer?: SortOrderInput | SortOrder
    marks?: SortOrder
    explanation?: SortOrderInput | SortOrder
    order?: SortOrder
    testId?: SortOrder
    _count?: QuestionCountOrderByAggregateInput
    _avg?: QuestionAvgOrderByAggregateInput
    _max?: QuestionMaxOrderByAggregateInput
    _min?: QuestionMinOrderByAggregateInput
    _sum?: QuestionSumOrderByAggregateInput
  }

  export type QuestionScalarWhereWithAggregatesInput = {
    AND?: QuestionScalarWhereWithAggregatesInput | QuestionScalarWhereWithAggregatesInput[]
    OR?: QuestionScalarWhereWithAggregatesInput[]
    NOT?: QuestionScalarWhereWithAggregatesInput | QuestionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Question"> | string
    text?: StringWithAggregatesFilter<"Question"> | string
    type?: EnumQuestionTypeWithAggregatesFilter<"Question"> | $Enums.QuestionType
    options?: StringNullableWithAggregatesFilter<"Question"> | string | null
    correctOption?: IntNullableWithAggregatesFilter<"Question"> | number | null
    correctAnswer?: StringNullableWithAggregatesFilter<"Question"> | string | null
    marks?: IntWithAggregatesFilter<"Question"> | number
    explanation?: StringNullableWithAggregatesFilter<"Question"> | string | null
    order?: IntWithAggregatesFilter<"Question"> | number
    testId?: StringWithAggregatesFilter<"Question"> | string
  }

  export type TestScoreWhereInput = {
    AND?: TestScoreWhereInput | TestScoreWhereInput[]
    OR?: TestScoreWhereInput[]
    NOT?: TestScoreWhereInput | TestScoreWhereInput[]
    id?: StringFilter<"TestScore"> | string
    studentId?: StringFilter<"TestScore"> | string
    testId?: StringFilter<"TestScore"> | string
    score?: IntFilter<"TestScore"> | number
    totalMarks?: IntFilter<"TestScore"> | number
    passed?: BoolNullableFilter<"TestScore"> | boolean | null
    remarks?: StringNullableFilter<"TestScore"> | string | null
    gradedAt?: DateTimeNullableFilter<"TestScore"> | Date | string | null
    answers?: StringFilter<"TestScore"> | string
    createdAt?: DateTimeFilter<"TestScore"> | Date | string
    updatedAt?: DateTimeFilter<"TestScore"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    test?: XOR<TestScalarRelationFilter, TestWhereInput>
  }

  export type TestScoreOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    testId?: SortOrder
    score?: SortOrder
    totalMarks?: SortOrder
    passed?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    gradedAt?: SortOrderInput | SortOrder
    answers?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    student?: StudentOrderByWithRelationInput
    test?: TestOrderByWithRelationInput
  }

  export type TestScoreWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    studentId_testId?: TestScoreStudentIdTestIdCompoundUniqueInput
    AND?: TestScoreWhereInput | TestScoreWhereInput[]
    OR?: TestScoreWhereInput[]
    NOT?: TestScoreWhereInput | TestScoreWhereInput[]
    studentId?: StringFilter<"TestScore"> | string
    testId?: StringFilter<"TestScore"> | string
    score?: IntFilter<"TestScore"> | number
    totalMarks?: IntFilter<"TestScore"> | number
    passed?: BoolNullableFilter<"TestScore"> | boolean | null
    remarks?: StringNullableFilter<"TestScore"> | string | null
    gradedAt?: DateTimeNullableFilter<"TestScore"> | Date | string | null
    answers?: StringFilter<"TestScore"> | string
    createdAt?: DateTimeFilter<"TestScore"> | Date | string
    updatedAt?: DateTimeFilter<"TestScore"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    test?: XOR<TestScalarRelationFilter, TestWhereInput>
  }, "id" | "studentId_testId">

  export type TestScoreOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    testId?: SortOrder
    score?: SortOrder
    totalMarks?: SortOrder
    passed?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    gradedAt?: SortOrderInput | SortOrder
    answers?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TestScoreCountOrderByAggregateInput
    _avg?: TestScoreAvgOrderByAggregateInput
    _max?: TestScoreMaxOrderByAggregateInput
    _min?: TestScoreMinOrderByAggregateInput
    _sum?: TestScoreSumOrderByAggregateInput
  }

  export type TestScoreScalarWhereWithAggregatesInput = {
    AND?: TestScoreScalarWhereWithAggregatesInput | TestScoreScalarWhereWithAggregatesInput[]
    OR?: TestScoreScalarWhereWithAggregatesInput[]
    NOT?: TestScoreScalarWhereWithAggregatesInput | TestScoreScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TestScore"> | string
    studentId?: StringWithAggregatesFilter<"TestScore"> | string
    testId?: StringWithAggregatesFilter<"TestScore"> | string
    score?: IntWithAggregatesFilter<"TestScore"> | number
    totalMarks?: IntWithAggregatesFilter<"TestScore"> | number
    passed?: BoolNullableWithAggregatesFilter<"TestScore"> | boolean | null
    remarks?: StringNullableWithAggregatesFilter<"TestScore"> | string | null
    gradedAt?: DateTimeNullableWithAggregatesFilter<"TestScore"> | Date | string | null
    answers?: StringWithAggregatesFilter<"TestScore"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TestScore"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TestScore"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    username?: string | null
    passwordHash?: string | null
    uniqueId?: string | null
    image?: string | null
    gender?: $Enums.Gender
    phone?: string | null
    city?: string | null
    accountId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tests?: TestCreateNestedManyWithoutCreatedByInput
    studentsCreated?: StudentCreateNestedManyWithoutCreatedByInput
    proctorFlags?: LiveProctorFlagCreateNestedManyWithoutProctorInput
    sessions?: LoginSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    username?: string | null
    passwordHash?: string | null
    uniqueId?: string | null
    image?: string | null
    gender?: $Enums.Gender
    phone?: string | null
    city?: string | null
    accountId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tests?: TestUncheckedCreateNestedManyWithoutCreatedByInput
    studentsCreated?: StudentUncheckedCreateNestedManyWithoutCreatedByInput
    proctorFlags?: LiveProctorFlagUncheckedCreateNestedManyWithoutProctorInput
    sessions?: LoginSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    uniqueId?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    accountId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tests?: TestUpdateManyWithoutCreatedByNestedInput
    studentsCreated?: StudentUpdateManyWithoutCreatedByNestedInput
    proctorFlags?: LiveProctorFlagUpdateManyWithoutProctorNestedInput
    sessions?: LoginSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    uniqueId?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    accountId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tests?: TestUncheckedUpdateManyWithoutCreatedByNestedInput
    studentsCreated?: StudentUncheckedUpdateManyWithoutCreatedByNestedInput
    proctorFlags?: LiveProctorFlagUncheckedUpdateManyWithoutProctorNestedInput
    sessions?: LoginSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    username?: string | null
    passwordHash?: string | null
    uniqueId?: string | null
    image?: string | null
    gender?: $Enums.Gender
    phone?: string | null
    city?: string | null
    accountId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    uniqueId?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    accountId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    uniqueId?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    accountId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoginSessionCreateInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type LoginSessionUncheckedCreateInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
    userId: string
  }

  export type LoginSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type LoginSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type LoginSessionCreateManyInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
    userId: string
  }

  export type LoginSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoginSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type StudentCreateInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutStudentsCreatedInput
    testScores?: TestScoreCreateNestedManyWithoutStudentInput
    liveAttempts?: LiveTestAttemptCreateNestedManyWithoutStudentInput
    proctorFlags?: LiveProctorFlagCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    testScores?: TestScoreUncheckedCreateNestedManyWithoutStudentInput
    liveAttempts?: LiveTestAttemptUncheckedCreateNestedManyWithoutStudentInput
    proctorFlags?: LiveProctorFlagUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutStudentsCreatedNestedInput
    testScores?: TestScoreUpdateManyWithoutStudentNestedInput
    liveAttempts?: LiveTestAttemptUpdateManyWithoutStudentNestedInput
    proctorFlags?: LiveProctorFlagUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testScores?: TestScoreUncheckedUpdateManyWithoutStudentNestedInput
    liveAttempts?: LiveTestAttemptUncheckedUpdateManyWithoutStudentNestedInput
    proctorFlags?: LiveProctorFlagUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateManyInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestCreateInput = {
    id?: string
    name: string
    description?: string | null
    subjectName?: string
    totalMarks?: number | null
    numberOfQuestions?: number | null
    difficulty?: $Enums.Difficulty
    slug: string
    settings?: string
    visibility?: boolean
    isScheduled?: boolean
    startTime?: Date | string | null
    duration?: number | null
    allowRetake?: boolean
    showResults?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutTestsInput
    questions?: QuestionCreateNestedManyWithoutTestInput
    testScores?: TestScoreCreateNestedManyWithoutTestInput
    liveAttempts?: LiveTestAttemptCreateNestedManyWithoutTestInput
    proctorFlags?: LiveProctorFlagCreateNestedManyWithoutTestInput
  }

  export type TestUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    subjectName?: string
    totalMarks?: number | null
    numberOfQuestions?: number | null
    difficulty?: $Enums.Difficulty
    slug: string
    settings?: string
    visibility?: boolean
    isScheduled?: boolean
    startTime?: Date | string | null
    duration?: number | null
    allowRetake?: boolean
    showResults?: boolean
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionUncheckedCreateNestedManyWithoutTestInput
    testScores?: TestScoreUncheckedCreateNestedManyWithoutTestInput
    liveAttempts?: LiveTestAttemptUncheckedCreateNestedManyWithoutTestInput
    proctorFlags?: LiveProctorFlagUncheckedCreateNestedManyWithoutTestInput
  }

  export type TestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    subjectName?: StringFieldUpdateOperationsInput | string
    totalMarks?: NullableIntFieldUpdateOperationsInput | number | null
    numberOfQuestions?: NullableIntFieldUpdateOperationsInput | number | null
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    slug?: StringFieldUpdateOperationsInput | string
    settings?: StringFieldUpdateOperationsInput | string
    visibility?: BoolFieldUpdateOperationsInput | boolean
    isScheduled?: BoolFieldUpdateOperationsInput | boolean
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    allowRetake?: BoolFieldUpdateOperationsInput | boolean
    showResults?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutTestsNestedInput
    questions?: QuestionUpdateManyWithoutTestNestedInput
    testScores?: TestScoreUpdateManyWithoutTestNestedInput
    liveAttempts?: LiveTestAttemptUpdateManyWithoutTestNestedInput
    proctorFlags?: LiveProctorFlagUpdateManyWithoutTestNestedInput
  }

  export type TestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    subjectName?: StringFieldUpdateOperationsInput | string
    totalMarks?: NullableIntFieldUpdateOperationsInput | number | null
    numberOfQuestions?: NullableIntFieldUpdateOperationsInput | number | null
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    slug?: StringFieldUpdateOperationsInput | string
    settings?: StringFieldUpdateOperationsInput | string
    visibility?: BoolFieldUpdateOperationsInput | boolean
    isScheduled?: BoolFieldUpdateOperationsInput | boolean
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    allowRetake?: BoolFieldUpdateOperationsInput | boolean
    showResults?: BoolFieldUpdateOperationsInput | boolean
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUncheckedUpdateManyWithoutTestNestedInput
    testScores?: TestScoreUncheckedUpdateManyWithoutTestNestedInput
    liveAttempts?: LiveTestAttemptUncheckedUpdateManyWithoutTestNestedInput
    proctorFlags?: LiveProctorFlagUncheckedUpdateManyWithoutTestNestedInput
  }

  export type TestCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    subjectName?: string
    totalMarks?: number | null
    numberOfQuestions?: number | null
    difficulty?: $Enums.Difficulty
    slug: string
    settings?: string
    visibility?: boolean
    isScheduled?: boolean
    startTime?: Date | string | null
    duration?: number | null
    allowRetake?: boolean
    showResults?: boolean
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    subjectName?: StringFieldUpdateOperationsInput | string
    totalMarks?: NullableIntFieldUpdateOperationsInput | number | null
    numberOfQuestions?: NullableIntFieldUpdateOperationsInput | number | null
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    slug?: StringFieldUpdateOperationsInput | string
    settings?: StringFieldUpdateOperationsInput | string
    visibility?: BoolFieldUpdateOperationsInput | boolean
    isScheduled?: BoolFieldUpdateOperationsInput | boolean
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    allowRetake?: BoolFieldUpdateOperationsInput | boolean
    showResults?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    subjectName?: StringFieldUpdateOperationsInput | string
    totalMarks?: NullableIntFieldUpdateOperationsInput | number | null
    numberOfQuestions?: NullableIntFieldUpdateOperationsInput | number | null
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    slug?: StringFieldUpdateOperationsInput | string
    settings?: StringFieldUpdateOperationsInput | string
    visibility?: BoolFieldUpdateOperationsInput | boolean
    isScheduled?: BoolFieldUpdateOperationsInput | boolean
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    allowRetake?: BoolFieldUpdateOperationsInput | boolean
    showResults?: BoolFieldUpdateOperationsInput | boolean
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LiveTestAttemptCreateInput = {
    id?: string
    passwordUsed?: boolean
    setupCompleted?: boolean
    startedAt?: Date | string
    examStartedAt?: Date | string | null
    submittedAt?: Date | string | null
    answers?: string
    flagged?: string
    score?: number | null
    totalMarks?: number | null
    violationFlags?: JsonNullValueInput | InputJsonValue
    proctorDeductions?: number
    timePenaltySeconds?: number
    examCurrentIndex?: number
    endedByProctor?: boolean
    endReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    test: TestCreateNestedOneWithoutLiveAttemptsInput
    student: StudentCreateNestedOneWithoutLiveAttemptsInput
    proctorFlags?: LiveProctorFlagCreateNestedManyWithoutAttemptInput
  }

  export type LiveTestAttemptUncheckedCreateInput = {
    id?: string
    testId: string
    studentId: string
    passwordUsed?: boolean
    setupCompleted?: boolean
    startedAt?: Date | string
    examStartedAt?: Date | string | null
    submittedAt?: Date | string | null
    answers?: string
    flagged?: string
    score?: number | null
    totalMarks?: number | null
    violationFlags?: JsonNullValueInput | InputJsonValue
    proctorDeductions?: number
    timePenaltySeconds?: number
    examCurrentIndex?: number
    endedByProctor?: boolean
    endReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    proctorFlags?: LiveProctorFlagUncheckedCreateNestedManyWithoutAttemptInput
  }

  export type LiveTestAttemptUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    passwordUsed?: BoolFieldUpdateOperationsInput | boolean
    setupCompleted?: BoolFieldUpdateOperationsInput | boolean
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    examStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: StringFieldUpdateOperationsInput | string
    flagged?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    totalMarks?: NullableIntFieldUpdateOperationsInput | number | null
    violationFlags?: JsonNullValueInput | InputJsonValue
    proctorDeductions?: IntFieldUpdateOperationsInput | number
    timePenaltySeconds?: IntFieldUpdateOperationsInput | number
    examCurrentIndex?: IntFieldUpdateOperationsInput | number
    endedByProctor?: BoolFieldUpdateOperationsInput | boolean
    endReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    test?: TestUpdateOneRequiredWithoutLiveAttemptsNestedInput
    student?: StudentUpdateOneRequiredWithoutLiveAttemptsNestedInput
    proctorFlags?: LiveProctorFlagUpdateManyWithoutAttemptNestedInput
  }

  export type LiveTestAttemptUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    passwordUsed?: BoolFieldUpdateOperationsInput | boolean
    setupCompleted?: BoolFieldUpdateOperationsInput | boolean
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    examStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: StringFieldUpdateOperationsInput | string
    flagged?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    totalMarks?: NullableIntFieldUpdateOperationsInput | number | null
    violationFlags?: JsonNullValueInput | InputJsonValue
    proctorDeductions?: IntFieldUpdateOperationsInput | number
    timePenaltySeconds?: IntFieldUpdateOperationsInput | number
    examCurrentIndex?: IntFieldUpdateOperationsInput | number
    endedByProctor?: BoolFieldUpdateOperationsInput | boolean
    endReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proctorFlags?: LiveProctorFlagUncheckedUpdateManyWithoutAttemptNestedInput
  }

  export type LiveTestAttemptCreateManyInput = {
    id?: string
    testId: string
    studentId: string
    passwordUsed?: boolean
    setupCompleted?: boolean
    startedAt?: Date | string
    examStartedAt?: Date | string | null
    submittedAt?: Date | string | null
    answers?: string
    flagged?: string
    score?: number | null
    totalMarks?: number | null
    violationFlags?: JsonNullValueInput | InputJsonValue
    proctorDeductions?: number
    timePenaltySeconds?: number
    examCurrentIndex?: number
    endedByProctor?: boolean
    endReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LiveTestAttemptUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    passwordUsed?: BoolFieldUpdateOperationsInput | boolean
    setupCompleted?: BoolFieldUpdateOperationsInput | boolean
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    examStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: StringFieldUpdateOperationsInput | string
    flagged?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    totalMarks?: NullableIntFieldUpdateOperationsInput | number | null
    violationFlags?: JsonNullValueInput | InputJsonValue
    proctorDeductions?: IntFieldUpdateOperationsInput | number
    timePenaltySeconds?: IntFieldUpdateOperationsInput | number
    examCurrentIndex?: IntFieldUpdateOperationsInput | number
    endedByProctor?: BoolFieldUpdateOperationsInput | boolean
    endReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LiveTestAttemptUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    passwordUsed?: BoolFieldUpdateOperationsInput | boolean
    setupCompleted?: BoolFieldUpdateOperationsInput | boolean
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    examStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: StringFieldUpdateOperationsInput | string
    flagged?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    totalMarks?: NullableIntFieldUpdateOperationsInput | number | null
    violationFlags?: JsonNullValueInput | InputJsonValue
    proctorDeductions?: IntFieldUpdateOperationsInput | number
    timePenaltySeconds?: IntFieldUpdateOperationsInput | number
    examCurrentIndex?: IntFieldUpdateOperationsInput | number
    endedByProctor?: BoolFieldUpdateOperationsInput | boolean
    endReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LiveProctorFlagCreateInput = {
    id?: string
    note?: string | null
    createdAt?: Date | string
    test: TestCreateNestedOneWithoutProctorFlagsInput
    student: StudentCreateNestedOneWithoutProctorFlagsInput
    attempt?: LiveTestAttemptCreateNestedOneWithoutProctorFlagsInput
    proctor: UserCreateNestedOneWithoutProctorFlagsInput
  }

  export type LiveProctorFlagUncheckedCreateInput = {
    id?: string
    testId: string
    studentId: string
    attemptId?: string | null
    proctorId: string
    note?: string | null
    createdAt?: Date | string
  }

  export type LiveProctorFlagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    test?: TestUpdateOneRequiredWithoutProctorFlagsNestedInput
    student?: StudentUpdateOneRequiredWithoutProctorFlagsNestedInput
    attempt?: LiveTestAttemptUpdateOneWithoutProctorFlagsNestedInput
    proctor?: UserUpdateOneRequiredWithoutProctorFlagsNestedInput
  }

  export type LiveProctorFlagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    attemptId?: NullableStringFieldUpdateOperationsInput | string | null
    proctorId?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LiveProctorFlagCreateManyInput = {
    id?: string
    testId: string
    studentId: string
    attemptId?: string | null
    proctorId: string
    note?: string | null
    createdAt?: Date | string
  }

  export type LiveProctorFlagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LiveProctorFlagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    attemptId?: NullableStringFieldUpdateOperationsInput | string | null
    proctorId?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionCreateInput = {
    id?: string
    text: string
    type: $Enums.QuestionType
    options?: string | null
    correctOption?: number | null
    correctAnswer?: string | null
    marks: number
    explanation?: string | null
    order?: number
    test: TestCreateNestedOneWithoutQuestionsInput
  }

  export type QuestionUncheckedCreateInput = {
    id?: string
    text: string
    type: $Enums.QuestionType
    options?: string | null
    correctOption?: number | null
    correctAnswer?: string | null
    marks: number
    explanation?: string | null
    order?: number
    testId: string
  }

  export type QuestionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    options?: NullableStringFieldUpdateOperationsInput | string | null
    correctOption?: NullableIntFieldUpdateOperationsInput | number | null
    correctAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    marks?: IntFieldUpdateOperationsInput | number
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    test?: TestUpdateOneRequiredWithoutQuestionsNestedInput
  }

  export type QuestionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    options?: NullableStringFieldUpdateOperationsInput | string | null
    correctOption?: NullableIntFieldUpdateOperationsInput | number | null
    correctAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    marks?: IntFieldUpdateOperationsInput | number
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    testId?: StringFieldUpdateOperationsInput | string
  }

  export type QuestionCreateManyInput = {
    id?: string
    text: string
    type: $Enums.QuestionType
    options?: string | null
    correctOption?: number | null
    correctAnswer?: string | null
    marks: number
    explanation?: string | null
    order?: number
    testId: string
  }

  export type QuestionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    options?: NullableStringFieldUpdateOperationsInput | string | null
    correctOption?: NullableIntFieldUpdateOperationsInput | number | null
    correctAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    marks?: IntFieldUpdateOperationsInput | number
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
  }

  export type QuestionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    options?: NullableStringFieldUpdateOperationsInput | string | null
    correctOption?: NullableIntFieldUpdateOperationsInput | number | null
    correctAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    marks?: IntFieldUpdateOperationsInput | number
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    testId?: StringFieldUpdateOperationsInput | string
  }

  export type TestScoreCreateInput = {
    id?: string
    score: number
    totalMarks: number
    passed?: boolean | null
    remarks?: string | null
    gradedAt?: Date | string | null
    answers?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    student: StudentCreateNestedOneWithoutTestScoresInput
    test: TestCreateNestedOneWithoutTestScoresInput
  }

  export type TestScoreUncheckedCreateInput = {
    id?: string
    studentId: string
    testId: string
    score: number
    totalMarks: number
    passed?: boolean | null
    remarks?: string | null
    gradedAt?: Date | string | null
    answers?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TestScoreUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    totalMarks?: IntFieldUpdateOperationsInput | number
    passed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    gradedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutTestScoresNestedInput
    test?: TestUpdateOneRequiredWithoutTestScoresNestedInput
  }

  export type TestScoreUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    totalMarks?: IntFieldUpdateOperationsInput | number
    passed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    gradedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestScoreCreateManyInput = {
    id?: string
    studentId: string
    testId: string
    score: number
    totalMarks: number
    passed?: boolean | null
    remarks?: string | null
    gradedAt?: Date | string | null
    answers?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TestScoreUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    totalMarks?: IntFieldUpdateOperationsInput | number
    passed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    gradedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestScoreUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    totalMarks?: IntFieldUpdateOperationsInput | number
    passed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    gradedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TestListRelationFilter = {
    every?: TestWhereInput
    some?: TestWhereInput
    none?: TestWhereInput
  }

  export type StudentListRelationFilter = {
    every?: StudentWhereInput
    some?: StudentWhereInput
    none?: StudentWhereInput
  }

  export type LiveProctorFlagListRelationFilter = {
    every?: LiveProctorFlagWhereInput
    some?: LiveProctorFlagWhereInput
    none?: LiveProctorFlagWhereInput
  }

  export type LoginSessionListRelationFilter = {
    every?: LoginSessionWhereInput
    some?: LoginSessionWhereInput
    none?: LoginSessionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LiveProctorFlagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LoginSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    uniqueId?: SortOrder
    image?: SortOrder
    gender?: SortOrder
    phone?: SortOrder
    city?: SortOrder
    accountId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    uniqueId?: SortOrder
    image?: SortOrder
    gender?: SortOrder
    phone?: SortOrder
    city?: SortOrder
    accountId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    uniqueId?: SortOrder
    image?: SortOrder
    gender?: SortOrder
    phone?: SortOrder
    city?: SortOrder
    accountId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type LoginSessionCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type LoginSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type LoginSessionMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type TestScoreListRelationFilter = {
    every?: TestScoreWhereInput
    some?: TestScoreWhereInput
    none?: TestScoreWhereInput
  }

  export type LiveTestAttemptListRelationFilter = {
    every?: LiveTestAttemptWhereInput
    some?: LiveTestAttemptWhereInput
    none?: LiveTestAttemptWhereInput
  }

  export type TestScoreOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LiveTestAttemptOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumDifficultyFilter<$PrismaModel = never> = {
    equals?: $Enums.Difficulty | EnumDifficultyFieldRefInput<$PrismaModel>
    in?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    not?: NestedEnumDifficultyFilter<$PrismaModel> | $Enums.Difficulty
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type QuestionListRelationFilter = {
    every?: QuestionWhereInput
    some?: QuestionWhereInput
    none?: QuestionWhereInput
  }

  export type QuestionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TestCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    subjectName?: SortOrder
    totalMarks?: SortOrder
    numberOfQuestions?: SortOrder
    difficulty?: SortOrder
    slug?: SortOrder
    settings?: SortOrder
    visibility?: SortOrder
    isScheduled?: SortOrder
    startTime?: SortOrder
    duration?: SortOrder
    allowRetake?: SortOrder
    showResults?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TestAvgOrderByAggregateInput = {
    totalMarks?: SortOrder
    numberOfQuestions?: SortOrder
    duration?: SortOrder
  }

  export type TestMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    subjectName?: SortOrder
    totalMarks?: SortOrder
    numberOfQuestions?: SortOrder
    difficulty?: SortOrder
    slug?: SortOrder
    settings?: SortOrder
    visibility?: SortOrder
    isScheduled?: SortOrder
    startTime?: SortOrder
    duration?: SortOrder
    allowRetake?: SortOrder
    showResults?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TestMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    subjectName?: SortOrder
    totalMarks?: SortOrder
    numberOfQuestions?: SortOrder
    difficulty?: SortOrder
    slug?: SortOrder
    settings?: SortOrder
    visibility?: SortOrder
    isScheduled?: SortOrder
    startTime?: SortOrder
    duration?: SortOrder
    allowRetake?: SortOrder
    showResults?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TestSumOrderByAggregateInput = {
    totalMarks?: SortOrder
    numberOfQuestions?: SortOrder
    duration?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumDifficultyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Difficulty | EnumDifficultyFieldRefInput<$PrismaModel>
    in?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    not?: NestedEnumDifficultyWithAggregatesFilter<$PrismaModel> | $Enums.Difficulty
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDifficultyFilter<$PrismaModel>
    _max?: NestedEnumDifficultyFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type TestScalarRelationFilter = {
    is?: TestWhereInput
    isNot?: TestWhereInput
  }

  export type StudentScalarRelationFilter = {
    is?: StudentWhereInput
    isNot?: StudentWhereInput
  }

  export type LiveTestAttemptCountOrderByAggregateInput = {
    id?: SortOrder
    testId?: SortOrder
    studentId?: SortOrder
    passwordUsed?: SortOrder
    setupCompleted?: SortOrder
    startedAt?: SortOrder
    examStartedAt?: SortOrder
    submittedAt?: SortOrder
    answers?: SortOrder
    flagged?: SortOrder
    score?: SortOrder
    totalMarks?: SortOrder
    violationFlags?: SortOrder
    proctorDeductions?: SortOrder
    timePenaltySeconds?: SortOrder
    examCurrentIndex?: SortOrder
    endedByProctor?: SortOrder
    endReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LiveTestAttemptAvgOrderByAggregateInput = {
    score?: SortOrder
    totalMarks?: SortOrder
    proctorDeductions?: SortOrder
    timePenaltySeconds?: SortOrder
    examCurrentIndex?: SortOrder
  }

  export type LiveTestAttemptMaxOrderByAggregateInput = {
    id?: SortOrder
    testId?: SortOrder
    studentId?: SortOrder
    passwordUsed?: SortOrder
    setupCompleted?: SortOrder
    startedAt?: SortOrder
    examStartedAt?: SortOrder
    submittedAt?: SortOrder
    answers?: SortOrder
    flagged?: SortOrder
    score?: SortOrder
    totalMarks?: SortOrder
    proctorDeductions?: SortOrder
    timePenaltySeconds?: SortOrder
    examCurrentIndex?: SortOrder
    endedByProctor?: SortOrder
    endReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LiveTestAttemptMinOrderByAggregateInput = {
    id?: SortOrder
    testId?: SortOrder
    studentId?: SortOrder
    passwordUsed?: SortOrder
    setupCompleted?: SortOrder
    startedAt?: SortOrder
    examStartedAt?: SortOrder
    submittedAt?: SortOrder
    answers?: SortOrder
    flagged?: SortOrder
    score?: SortOrder
    totalMarks?: SortOrder
    proctorDeductions?: SortOrder
    timePenaltySeconds?: SortOrder
    examCurrentIndex?: SortOrder
    endedByProctor?: SortOrder
    endReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LiveTestAttemptSumOrderByAggregateInput = {
    score?: SortOrder
    totalMarks?: SortOrder
    proctorDeductions?: SortOrder
    timePenaltySeconds?: SortOrder
    examCurrentIndex?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type LiveTestAttemptNullableScalarRelationFilter = {
    is?: LiveTestAttemptWhereInput | null
    isNot?: LiveTestAttemptWhereInput | null
  }

  export type LiveProctorFlagCountOrderByAggregateInput = {
    id?: SortOrder
    testId?: SortOrder
    studentId?: SortOrder
    attemptId?: SortOrder
    proctorId?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type LiveProctorFlagMaxOrderByAggregateInput = {
    id?: SortOrder
    testId?: SortOrder
    studentId?: SortOrder
    attemptId?: SortOrder
    proctorId?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type LiveProctorFlagMinOrderByAggregateInput = {
    id?: SortOrder
    testId?: SortOrder
    studentId?: SortOrder
    attemptId?: SortOrder
    proctorId?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumQuestionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | EnumQuestionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumQuestionTypeFilter<$PrismaModel> | $Enums.QuestionType
  }

  export type QuestionCountOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    type?: SortOrder
    options?: SortOrder
    correctOption?: SortOrder
    correctAnswer?: SortOrder
    marks?: SortOrder
    explanation?: SortOrder
    order?: SortOrder
    testId?: SortOrder
  }

  export type QuestionAvgOrderByAggregateInput = {
    correctOption?: SortOrder
    marks?: SortOrder
    order?: SortOrder
  }

  export type QuestionMaxOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    type?: SortOrder
    options?: SortOrder
    correctOption?: SortOrder
    correctAnswer?: SortOrder
    marks?: SortOrder
    explanation?: SortOrder
    order?: SortOrder
    testId?: SortOrder
  }

  export type QuestionMinOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    type?: SortOrder
    options?: SortOrder
    correctOption?: SortOrder
    correctAnswer?: SortOrder
    marks?: SortOrder
    explanation?: SortOrder
    order?: SortOrder
    testId?: SortOrder
  }

  export type QuestionSumOrderByAggregateInput = {
    correctOption?: SortOrder
    marks?: SortOrder
    order?: SortOrder
  }

  export type EnumQuestionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | EnumQuestionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumQuestionTypeWithAggregatesFilter<$PrismaModel> | $Enums.QuestionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQuestionTypeFilter<$PrismaModel>
    _max?: NestedEnumQuestionTypeFilter<$PrismaModel>
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type TestScoreStudentIdTestIdCompoundUniqueInput = {
    studentId: string
    testId: string
  }

  export type TestScoreCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    testId?: SortOrder
    score?: SortOrder
    totalMarks?: SortOrder
    passed?: SortOrder
    remarks?: SortOrder
    gradedAt?: SortOrder
    answers?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TestScoreAvgOrderByAggregateInput = {
    score?: SortOrder
    totalMarks?: SortOrder
  }

  export type TestScoreMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    testId?: SortOrder
    score?: SortOrder
    totalMarks?: SortOrder
    passed?: SortOrder
    remarks?: SortOrder
    gradedAt?: SortOrder
    answers?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TestScoreMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    testId?: SortOrder
    score?: SortOrder
    totalMarks?: SortOrder
    passed?: SortOrder
    remarks?: SortOrder
    gradedAt?: SortOrder
    answers?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TestScoreSumOrderByAggregateInput = {
    score?: SortOrder
    totalMarks?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type TestCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<TestCreateWithoutCreatedByInput, TestUncheckedCreateWithoutCreatedByInput> | TestCreateWithoutCreatedByInput[] | TestUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TestCreateOrConnectWithoutCreatedByInput | TestCreateOrConnectWithoutCreatedByInput[]
    createMany?: TestCreateManyCreatedByInputEnvelope
    connect?: TestWhereUniqueInput | TestWhereUniqueInput[]
  }

  export type StudentCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<StudentCreateWithoutCreatedByInput, StudentUncheckedCreateWithoutCreatedByInput> | StudentCreateWithoutCreatedByInput[] | StudentUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutCreatedByInput | StudentCreateOrConnectWithoutCreatedByInput[]
    createMany?: StudentCreateManyCreatedByInputEnvelope
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
  }

  export type LiveProctorFlagCreateNestedManyWithoutProctorInput = {
    create?: XOR<LiveProctorFlagCreateWithoutProctorInput, LiveProctorFlagUncheckedCreateWithoutProctorInput> | LiveProctorFlagCreateWithoutProctorInput[] | LiveProctorFlagUncheckedCreateWithoutProctorInput[]
    connectOrCreate?: LiveProctorFlagCreateOrConnectWithoutProctorInput | LiveProctorFlagCreateOrConnectWithoutProctorInput[]
    createMany?: LiveProctorFlagCreateManyProctorInputEnvelope
    connect?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
  }

  export type LoginSessionCreateNestedManyWithoutUserInput = {
    create?: XOR<LoginSessionCreateWithoutUserInput, LoginSessionUncheckedCreateWithoutUserInput> | LoginSessionCreateWithoutUserInput[] | LoginSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LoginSessionCreateOrConnectWithoutUserInput | LoginSessionCreateOrConnectWithoutUserInput[]
    createMany?: LoginSessionCreateManyUserInputEnvelope
    connect?: LoginSessionWhereUniqueInput | LoginSessionWhereUniqueInput[]
  }

  export type TestUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<TestCreateWithoutCreatedByInput, TestUncheckedCreateWithoutCreatedByInput> | TestCreateWithoutCreatedByInput[] | TestUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TestCreateOrConnectWithoutCreatedByInput | TestCreateOrConnectWithoutCreatedByInput[]
    createMany?: TestCreateManyCreatedByInputEnvelope
    connect?: TestWhereUniqueInput | TestWhereUniqueInput[]
  }

  export type StudentUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<StudentCreateWithoutCreatedByInput, StudentUncheckedCreateWithoutCreatedByInput> | StudentCreateWithoutCreatedByInput[] | StudentUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutCreatedByInput | StudentCreateOrConnectWithoutCreatedByInput[]
    createMany?: StudentCreateManyCreatedByInputEnvelope
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
  }

  export type LiveProctorFlagUncheckedCreateNestedManyWithoutProctorInput = {
    create?: XOR<LiveProctorFlagCreateWithoutProctorInput, LiveProctorFlagUncheckedCreateWithoutProctorInput> | LiveProctorFlagCreateWithoutProctorInput[] | LiveProctorFlagUncheckedCreateWithoutProctorInput[]
    connectOrCreate?: LiveProctorFlagCreateOrConnectWithoutProctorInput | LiveProctorFlagCreateOrConnectWithoutProctorInput[]
    createMany?: LiveProctorFlagCreateManyProctorInputEnvelope
    connect?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
  }

  export type LoginSessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<LoginSessionCreateWithoutUserInput, LoginSessionUncheckedCreateWithoutUserInput> | LoginSessionCreateWithoutUserInput[] | LoginSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LoginSessionCreateOrConnectWithoutUserInput | LoginSessionCreateOrConnectWithoutUserInput[]
    createMany?: LoginSessionCreateManyUserInputEnvelope
    connect?: LoginSessionWhereUniqueInput | LoginSessionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TestUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<TestCreateWithoutCreatedByInput, TestUncheckedCreateWithoutCreatedByInput> | TestCreateWithoutCreatedByInput[] | TestUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TestCreateOrConnectWithoutCreatedByInput | TestCreateOrConnectWithoutCreatedByInput[]
    upsert?: TestUpsertWithWhereUniqueWithoutCreatedByInput | TestUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: TestCreateManyCreatedByInputEnvelope
    set?: TestWhereUniqueInput | TestWhereUniqueInput[]
    disconnect?: TestWhereUniqueInput | TestWhereUniqueInput[]
    delete?: TestWhereUniqueInput | TestWhereUniqueInput[]
    connect?: TestWhereUniqueInput | TestWhereUniqueInput[]
    update?: TestUpdateWithWhereUniqueWithoutCreatedByInput | TestUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: TestUpdateManyWithWhereWithoutCreatedByInput | TestUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: TestScalarWhereInput | TestScalarWhereInput[]
  }

  export type StudentUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<StudentCreateWithoutCreatedByInput, StudentUncheckedCreateWithoutCreatedByInput> | StudentCreateWithoutCreatedByInput[] | StudentUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutCreatedByInput | StudentCreateOrConnectWithoutCreatedByInput[]
    upsert?: StudentUpsertWithWhereUniqueWithoutCreatedByInput | StudentUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: StudentCreateManyCreatedByInputEnvelope
    set?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    disconnect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    delete?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    update?: StudentUpdateWithWhereUniqueWithoutCreatedByInput | StudentUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: StudentUpdateManyWithWhereWithoutCreatedByInput | StudentUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: StudentScalarWhereInput | StudentScalarWhereInput[]
  }

  export type LiveProctorFlagUpdateManyWithoutProctorNestedInput = {
    create?: XOR<LiveProctorFlagCreateWithoutProctorInput, LiveProctorFlagUncheckedCreateWithoutProctorInput> | LiveProctorFlagCreateWithoutProctorInput[] | LiveProctorFlagUncheckedCreateWithoutProctorInput[]
    connectOrCreate?: LiveProctorFlagCreateOrConnectWithoutProctorInput | LiveProctorFlagCreateOrConnectWithoutProctorInput[]
    upsert?: LiveProctorFlagUpsertWithWhereUniqueWithoutProctorInput | LiveProctorFlagUpsertWithWhereUniqueWithoutProctorInput[]
    createMany?: LiveProctorFlagCreateManyProctorInputEnvelope
    set?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
    disconnect?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
    delete?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
    connect?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
    update?: LiveProctorFlagUpdateWithWhereUniqueWithoutProctorInput | LiveProctorFlagUpdateWithWhereUniqueWithoutProctorInput[]
    updateMany?: LiveProctorFlagUpdateManyWithWhereWithoutProctorInput | LiveProctorFlagUpdateManyWithWhereWithoutProctorInput[]
    deleteMany?: LiveProctorFlagScalarWhereInput | LiveProctorFlagScalarWhereInput[]
  }

  export type LoginSessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<LoginSessionCreateWithoutUserInput, LoginSessionUncheckedCreateWithoutUserInput> | LoginSessionCreateWithoutUserInput[] | LoginSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LoginSessionCreateOrConnectWithoutUserInput | LoginSessionCreateOrConnectWithoutUserInput[]
    upsert?: LoginSessionUpsertWithWhereUniqueWithoutUserInput | LoginSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LoginSessionCreateManyUserInputEnvelope
    set?: LoginSessionWhereUniqueInput | LoginSessionWhereUniqueInput[]
    disconnect?: LoginSessionWhereUniqueInput | LoginSessionWhereUniqueInput[]
    delete?: LoginSessionWhereUniqueInput | LoginSessionWhereUniqueInput[]
    connect?: LoginSessionWhereUniqueInput | LoginSessionWhereUniqueInput[]
    update?: LoginSessionUpdateWithWhereUniqueWithoutUserInput | LoginSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LoginSessionUpdateManyWithWhereWithoutUserInput | LoginSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LoginSessionScalarWhereInput | LoginSessionScalarWhereInput[]
  }

  export type TestUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<TestCreateWithoutCreatedByInput, TestUncheckedCreateWithoutCreatedByInput> | TestCreateWithoutCreatedByInput[] | TestUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TestCreateOrConnectWithoutCreatedByInput | TestCreateOrConnectWithoutCreatedByInput[]
    upsert?: TestUpsertWithWhereUniqueWithoutCreatedByInput | TestUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: TestCreateManyCreatedByInputEnvelope
    set?: TestWhereUniqueInput | TestWhereUniqueInput[]
    disconnect?: TestWhereUniqueInput | TestWhereUniqueInput[]
    delete?: TestWhereUniqueInput | TestWhereUniqueInput[]
    connect?: TestWhereUniqueInput | TestWhereUniqueInput[]
    update?: TestUpdateWithWhereUniqueWithoutCreatedByInput | TestUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: TestUpdateManyWithWhereWithoutCreatedByInput | TestUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: TestScalarWhereInput | TestScalarWhereInput[]
  }

  export type StudentUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<StudentCreateWithoutCreatedByInput, StudentUncheckedCreateWithoutCreatedByInput> | StudentCreateWithoutCreatedByInput[] | StudentUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutCreatedByInput | StudentCreateOrConnectWithoutCreatedByInput[]
    upsert?: StudentUpsertWithWhereUniqueWithoutCreatedByInput | StudentUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: StudentCreateManyCreatedByInputEnvelope
    set?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    disconnect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    delete?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    update?: StudentUpdateWithWhereUniqueWithoutCreatedByInput | StudentUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: StudentUpdateManyWithWhereWithoutCreatedByInput | StudentUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: StudentScalarWhereInput | StudentScalarWhereInput[]
  }

  export type LiveProctorFlagUncheckedUpdateManyWithoutProctorNestedInput = {
    create?: XOR<LiveProctorFlagCreateWithoutProctorInput, LiveProctorFlagUncheckedCreateWithoutProctorInput> | LiveProctorFlagCreateWithoutProctorInput[] | LiveProctorFlagUncheckedCreateWithoutProctorInput[]
    connectOrCreate?: LiveProctorFlagCreateOrConnectWithoutProctorInput | LiveProctorFlagCreateOrConnectWithoutProctorInput[]
    upsert?: LiveProctorFlagUpsertWithWhereUniqueWithoutProctorInput | LiveProctorFlagUpsertWithWhereUniqueWithoutProctorInput[]
    createMany?: LiveProctorFlagCreateManyProctorInputEnvelope
    set?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
    disconnect?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
    delete?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
    connect?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
    update?: LiveProctorFlagUpdateWithWhereUniqueWithoutProctorInput | LiveProctorFlagUpdateWithWhereUniqueWithoutProctorInput[]
    updateMany?: LiveProctorFlagUpdateManyWithWhereWithoutProctorInput | LiveProctorFlagUpdateManyWithWhereWithoutProctorInput[]
    deleteMany?: LiveProctorFlagScalarWhereInput | LiveProctorFlagScalarWhereInput[]
  }

  export type LoginSessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<LoginSessionCreateWithoutUserInput, LoginSessionUncheckedCreateWithoutUserInput> | LoginSessionCreateWithoutUserInput[] | LoginSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LoginSessionCreateOrConnectWithoutUserInput | LoginSessionCreateOrConnectWithoutUserInput[]
    upsert?: LoginSessionUpsertWithWhereUniqueWithoutUserInput | LoginSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LoginSessionCreateManyUserInputEnvelope
    set?: LoginSessionWhereUniqueInput | LoginSessionWhereUniqueInput[]
    disconnect?: LoginSessionWhereUniqueInput | LoginSessionWhereUniqueInput[]
    delete?: LoginSessionWhereUniqueInput | LoginSessionWhereUniqueInput[]
    connect?: LoginSessionWhereUniqueInput | LoginSessionWhereUniqueInput[]
    update?: LoginSessionUpdateWithWhereUniqueWithoutUserInput | LoginSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LoginSessionUpdateManyWithWhereWithoutUserInput | LoginSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LoginSessionScalarWhereInput | LoginSessionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutStudentsCreatedInput = {
    create?: XOR<UserCreateWithoutStudentsCreatedInput, UserUncheckedCreateWithoutStudentsCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutStudentsCreatedInput
    connect?: UserWhereUniqueInput
  }

  export type TestScoreCreateNestedManyWithoutStudentInput = {
    create?: XOR<TestScoreCreateWithoutStudentInput, TestScoreUncheckedCreateWithoutStudentInput> | TestScoreCreateWithoutStudentInput[] | TestScoreUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: TestScoreCreateOrConnectWithoutStudentInput | TestScoreCreateOrConnectWithoutStudentInput[]
    createMany?: TestScoreCreateManyStudentInputEnvelope
    connect?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
  }

  export type LiveTestAttemptCreateNestedManyWithoutStudentInput = {
    create?: XOR<LiveTestAttemptCreateWithoutStudentInput, LiveTestAttemptUncheckedCreateWithoutStudentInput> | LiveTestAttemptCreateWithoutStudentInput[] | LiveTestAttemptUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: LiveTestAttemptCreateOrConnectWithoutStudentInput | LiveTestAttemptCreateOrConnectWithoutStudentInput[]
    createMany?: LiveTestAttemptCreateManyStudentInputEnvelope
    connect?: LiveTestAttemptWhereUniqueInput | LiveTestAttemptWhereUniqueInput[]
  }

  export type LiveProctorFlagCreateNestedManyWithoutStudentInput = {
    create?: XOR<LiveProctorFlagCreateWithoutStudentInput, LiveProctorFlagUncheckedCreateWithoutStudentInput> | LiveProctorFlagCreateWithoutStudentInput[] | LiveProctorFlagUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: LiveProctorFlagCreateOrConnectWithoutStudentInput | LiveProctorFlagCreateOrConnectWithoutStudentInput[]
    createMany?: LiveProctorFlagCreateManyStudentInputEnvelope
    connect?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
  }

  export type TestScoreUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<TestScoreCreateWithoutStudentInput, TestScoreUncheckedCreateWithoutStudentInput> | TestScoreCreateWithoutStudentInput[] | TestScoreUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: TestScoreCreateOrConnectWithoutStudentInput | TestScoreCreateOrConnectWithoutStudentInput[]
    createMany?: TestScoreCreateManyStudentInputEnvelope
    connect?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
  }

  export type LiveTestAttemptUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<LiveTestAttemptCreateWithoutStudentInput, LiveTestAttemptUncheckedCreateWithoutStudentInput> | LiveTestAttemptCreateWithoutStudentInput[] | LiveTestAttemptUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: LiveTestAttemptCreateOrConnectWithoutStudentInput | LiveTestAttemptCreateOrConnectWithoutStudentInput[]
    createMany?: LiveTestAttemptCreateManyStudentInputEnvelope
    connect?: LiveTestAttemptWhereUniqueInput | LiveTestAttemptWhereUniqueInput[]
  }

  export type LiveProctorFlagUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<LiveProctorFlagCreateWithoutStudentInput, LiveProctorFlagUncheckedCreateWithoutStudentInput> | LiveProctorFlagCreateWithoutStudentInput[] | LiveProctorFlagUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: LiveProctorFlagCreateOrConnectWithoutStudentInput | LiveProctorFlagCreateOrConnectWithoutStudentInput[]
    createMany?: LiveProctorFlagCreateManyStudentInputEnvelope
    connect?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutStudentsCreatedNestedInput = {
    create?: XOR<UserCreateWithoutStudentsCreatedInput, UserUncheckedCreateWithoutStudentsCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutStudentsCreatedInput
    upsert?: UserUpsertWithoutStudentsCreatedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStudentsCreatedInput, UserUpdateWithoutStudentsCreatedInput>, UserUncheckedUpdateWithoutStudentsCreatedInput>
  }

  export type TestScoreUpdateManyWithoutStudentNestedInput = {
    create?: XOR<TestScoreCreateWithoutStudentInput, TestScoreUncheckedCreateWithoutStudentInput> | TestScoreCreateWithoutStudentInput[] | TestScoreUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: TestScoreCreateOrConnectWithoutStudentInput | TestScoreCreateOrConnectWithoutStudentInput[]
    upsert?: TestScoreUpsertWithWhereUniqueWithoutStudentInput | TestScoreUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: TestScoreCreateManyStudentInputEnvelope
    set?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
    disconnect?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
    delete?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
    connect?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
    update?: TestScoreUpdateWithWhereUniqueWithoutStudentInput | TestScoreUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: TestScoreUpdateManyWithWhereWithoutStudentInput | TestScoreUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: TestScoreScalarWhereInput | TestScoreScalarWhereInput[]
  }

  export type LiveTestAttemptUpdateManyWithoutStudentNestedInput = {
    create?: XOR<LiveTestAttemptCreateWithoutStudentInput, LiveTestAttemptUncheckedCreateWithoutStudentInput> | LiveTestAttemptCreateWithoutStudentInput[] | LiveTestAttemptUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: LiveTestAttemptCreateOrConnectWithoutStudentInput | LiveTestAttemptCreateOrConnectWithoutStudentInput[]
    upsert?: LiveTestAttemptUpsertWithWhereUniqueWithoutStudentInput | LiveTestAttemptUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: LiveTestAttemptCreateManyStudentInputEnvelope
    set?: LiveTestAttemptWhereUniqueInput | LiveTestAttemptWhereUniqueInput[]
    disconnect?: LiveTestAttemptWhereUniqueInput | LiveTestAttemptWhereUniqueInput[]
    delete?: LiveTestAttemptWhereUniqueInput | LiveTestAttemptWhereUniqueInput[]
    connect?: LiveTestAttemptWhereUniqueInput | LiveTestAttemptWhereUniqueInput[]
    update?: LiveTestAttemptUpdateWithWhereUniqueWithoutStudentInput | LiveTestAttemptUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: LiveTestAttemptUpdateManyWithWhereWithoutStudentInput | LiveTestAttemptUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: LiveTestAttemptScalarWhereInput | LiveTestAttemptScalarWhereInput[]
  }

  export type LiveProctorFlagUpdateManyWithoutStudentNestedInput = {
    create?: XOR<LiveProctorFlagCreateWithoutStudentInput, LiveProctorFlagUncheckedCreateWithoutStudentInput> | LiveProctorFlagCreateWithoutStudentInput[] | LiveProctorFlagUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: LiveProctorFlagCreateOrConnectWithoutStudentInput | LiveProctorFlagCreateOrConnectWithoutStudentInput[]
    upsert?: LiveProctorFlagUpsertWithWhereUniqueWithoutStudentInput | LiveProctorFlagUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: LiveProctorFlagCreateManyStudentInputEnvelope
    set?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
    disconnect?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
    delete?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
    connect?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
    update?: LiveProctorFlagUpdateWithWhereUniqueWithoutStudentInput | LiveProctorFlagUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: LiveProctorFlagUpdateManyWithWhereWithoutStudentInput | LiveProctorFlagUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: LiveProctorFlagScalarWhereInput | LiveProctorFlagScalarWhereInput[]
  }

  export type TestScoreUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<TestScoreCreateWithoutStudentInput, TestScoreUncheckedCreateWithoutStudentInput> | TestScoreCreateWithoutStudentInput[] | TestScoreUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: TestScoreCreateOrConnectWithoutStudentInput | TestScoreCreateOrConnectWithoutStudentInput[]
    upsert?: TestScoreUpsertWithWhereUniqueWithoutStudentInput | TestScoreUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: TestScoreCreateManyStudentInputEnvelope
    set?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
    disconnect?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
    delete?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
    connect?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
    update?: TestScoreUpdateWithWhereUniqueWithoutStudentInput | TestScoreUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: TestScoreUpdateManyWithWhereWithoutStudentInput | TestScoreUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: TestScoreScalarWhereInput | TestScoreScalarWhereInput[]
  }

  export type LiveTestAttemptUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<LiveTestAttemptCreateWithoutStudentInput, LiveTestAttemptUncheckedCreateWithoutStudentInput> | LiveTestAttemptCreateWithoutStudentInput[] | LiveTestAttemptUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: LiveTestAttemptCreateOrConnectWithoutStudentInput | LiveTestAttemptCreateOrConnectWithoutStudentInput[]
    upsert?: LiveTestAttemptUpsertWithWhereUniqueWithoutStudentInput | LiveTestAttemptUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: LiveTestAttemptCreateManyStudentInputEnvelope
    set?: LiveTestAttemptWhereUniqueInput | LiveTestAttemptWhereUniqueInput[]
    disconnect?: LiveTestAttemptWhereUniqueInput | LiveTestAttemptWhereUniqueInput[]
    delete?: LiveTestAttemptWhereUniqueInput | LiveTestAttemptWhereUniqueInput[]
    connect?: LiveTestAttemptWhereUniqueInput | LiveTestAttemptWhereUniqueInput[]
    update?: LiveTestAttemptUpdateWithWhereUniqueWithoutStudentInput | LiveTestAttemptUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: LiveTestAttemptUpdateManyWithWhereWithoutStudentInput | LiveTestAttemptUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: LiveTestAttemptScalarWhereInput | LiveTestAttemptScalarWhereInput[]
  }

  export type LiveProctorFlagUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<LiveProctorFlagCreateWithoutStudentInput, LiveProctorFlagUncheckedCreateWithoutStudentInput> | LiveProctorFlagCreateWithoutStudentInput[] | LiveProctorFlagUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: LiveProctorFlagCreateOrConnectWithoutStudentInput | LiveProctorFlagCreateOrConnectWithoutStudentInput[]
    upsert?: LiveProctorFlagUpsertWithWhereUniqueWithoutStudentInput | LiveProctorFlagUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: LiveProctorFlagCreateManyStudentInputEnvelope
    set?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
    disconnect?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
    delete?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
    connect?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
    update?: LiveProctorFlagUpdateWithWhereUniqueWithoutStudentInput | LiveProctorFlagUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: LiveProctorFlagUpdateManyWithWhereWithoutStudentInput | LiveProctorFlagUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: LiveProctorFlagScalarWhereInput | LiveProctorFlagScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTestsInput = {
    create?: XOR<UserCreateWithoutTestsInput, UserUncheckedCreateWithoutTestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTestsInput
    connect?: UserWhereUniqueInput
  }

  export type QuestionCreateNestedManyWithoutTestInput = {
    create?: XOR<QuestionCreateWithoutTestInput, QuestionUncheckedCreateWithoutTestInput> | QuestionCreateWithoutTestInput[] | QuestionUncheckedCreateWithoutTestInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutTestInput | QuestionCreateOrConnectWithoutTestInput[]
    createMany?: QuestionCreateManyTestInputEnvelope
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
  }

  export type TestScoreCreateNestedManyWithoutTestInput = {
    create?: XOR<TestScoreCreateWithoutTestInput, TestScoreUncheckedCreateWithoutTestInput> | TestScoreCreateWithoutTestInput[] | TestScoreUncheckedCreateWithoutTestInput[]
    connectOrCreate?: TestScoreCreateOrConnectWithoutTestInput | TestScoreCreateOrConnectWithoutTestInput[]
    createMany?: TestScoreCreateManyTestInputEnvelope
    connect?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
  }

  export type LiveTestAttemptCreateNestedManyWithoutTestInput = {
    create?: XOR<LiveTestAttemptCreateWithoutTestInput, LiveTestAttemptUncheckedCreateWithoutTestInput> | LiveTestAttemptCreateWithoutTestInput[] | LiveTestAttemptUncheckedCreateWithoutTestInput[]
    connectOrCreate?: LiveTestAttemptCreateOrConnectWithoutTestInput | LiveTestAttemptCreateOrConnectWithoutTestInput[]
    createMany?: LiveTestAttemptCreateManyTestInputEnvelope
    connect?: LiveTestAttemptWhereUniqueInput | LiveTestAttemptWhereUniqueInput[]
  }

  export type LiveProctorFlagCreateNestedManyWithoutTestInput = {
    create?: XOR<LiveProctorFlagCreateWithoutTestInput, LiveProctorFlagUncheckedCreateWithoutTestInput> | LiveProctorFlagCreateWithoutTestInput[] | LiveProctorFlagUncheckedCreateWithoutTestInput[]
    connectOrCreate?: LiveProctorFlagCreateOrConnectWithoutTestInput | LiveProctorFlagCreateOrConnectWithoutTestInput[]
    createMany?: LiveProctorFlagCreateManyTestInputEnvelope
    connect?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
  }

  export type QuestionUncheckedCreateNestedManyWithoutTestInput = {
    create?: XOR<QuestionCreateWithoutTestInput, QuestionUncheckedCreateWithoutTestInput> | QuestionCreateWithoutTestInput[] | QuestionUncheckedCreateWithoutTestInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutTestInput | QuestionCreateOrConnectWithoutTestInput[]
    createMany?: QuestionCreateManyTestInputEnvelope
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
  }

  export type TestScoreUncheckedCreateNestedManyWithoutTestInput = {
    create?: XOR<TestScoreCreateWithoutTestInput, TestScoreUncheckedCreateWithoutTestInput> | TestScoreCreateWithoutTestInput[] | TestScoreUncheckedCreateWithoutTestInput[]
    connectOrCreate?: TestScoreCreateOrConnectWithoutTestInput | TestScoreCreateOrConnectWithoutTestInput[]
    createMany?: TestScoreCreateManyTestInputEnvelope
    connect?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
  }

  export type LiveTestAttemptUncheckedCreateNestedManyWithoutTestInput = {
    create?: XOR<LiveTestAttemptCreateWithoutTestInput, LiveTestAttemptUncheckedCreateWithoutTestInput> | LiveTestAttemptCreateWithoutTestInput[] | LiveTestAttemptUncheckedCreateWithoutTestInput[]
    connectOrCreate?: LiveTestAttemptCreateOrConnectWithoutTestInput | LiveTestAttemptCreateOrConnectWithoutTestInput[]
    createMany?: LiveTestAttemptCreateManyTestInputEnvelope
    connect?: LiveTestAttemptWhereUniqueInput | LiveTestAttemptWhereUniqueInput[]
  }

  export type LiveProctorFlagUncheckedCreateNestedManyWithoutTestInput = {
    create?: XOR<LiveProctorFlagCreateWithoutTestInput, LiveProctorFlagUncheckedCreateWithoutTestInput> | LiveProctorFlagCreateWithoutTestInput[] | LiveProctorFlagUncheckedCreateWithoutTestInput[]
    connectOrCreate?: LiveProctorFlagCreateOrConnectWithoutTestInput | LiveProctorFlagCreateOrConnectWithoutTestInput[]
    createMany?: LiveProctorFlagCreateManyTestInputEnvelope
    connect?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumDifficultyFieldUpdateOperationsInput = {
    set?: $Enums.Difficulty
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutTestsNestedInput = {
    create?: XOR<UserCreateWithoutTestsInput, UserUncheckedCreateWithoutTestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTestsInput
    upsert?: UserUpsertWithoutTestsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTestsInput, UserUpdateWithoutTestsInput>, UserUncheckedUpdateWithoutTestsInput>
  }

  export type QuestionUpdateManyWithoutTestNestedInput = {
    create?: XOR<QuestionCreateWithoutTestInput, QuestionUncheckedCreateWithoutTestInput> | QuestionCreateWithoutTestInput[] | QuestionUncheckedCreateWithoutTestInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutTestInput | QuestionCreateOrConnectWithoutTestInput[]
    upsert?: QuestionUpsertWithWhereUniqueWithoutTestInput | QuestionUpsertWithWhereUniqueWithoutTestInput[]
    createMany?: QuestionCreateManyTestInputEnvelope
    set?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    disconnect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    delete?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    update?: QuestionUpdateWithWhereUniqueWithoutTestInput | QuestionUpdateWithWhereUniqueWithoutTestInput[]
    updateMany?: QuestionUpdateManyWithWhereWithoutTestInput | QuestionUpdateManyWithWhereWithoutTestInput[]
    deleteMany?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
  }

  export type TestScoreUpdateManyWithoutTestNestedInput = {
    create?: XOR<TestScoreCreateWithoutTestInput, TestScoreUncheckedCreateWithoutTestInput> | TestScoreCreateWithoutTestInput[] | TestScoreUncheckedCreateWithoutTestInput[]
    connectOrCreate?: TestScoreCreateOrConnectWithoutTestInput | TestScoreCreateOrConnectWithoutTestInput[]
    upsert?: TestScoreUpsertWithWhereUniqueWithoutTestInput | TestScoreUpsertWithWhereUniqueWithoutTestInput[]
    createMany?: TestScoreCreateManyTestInputEnvelope
    set?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
    disconnect?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
    delete?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
    connect?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
    update?: TestScoreUpdateWithWhereUniqueWithoutTestInput | TestScoreUpdateWithWhereUniqueWithoutTestInput[]
    updateMany?: TestScoreUpdateManyWithWhereWithoutTestInput | TestScoreUpdateManyWithWhereWithoutTestInput[]
    deleteMany?: TestScoreScalarWhereInput | TestScoreScalarWhereInput[]
  }

  export type LiveTestAttemptUpdateManyWithoutTestNestedInput = {
    create?: XOR<LiveTestAttemptCreateWithoutTestInput, LiveTestAttemptUncheckedCreateWithoutTestInput> | LiveTestAttemptCreateWithoutTestInput[] | LiveTestAttemptUncheckedCreateWithoutTestInput[]
    connectOrCreate?: LiveTestAttemptCreateOrConnectWithoutTestInput | LiveTestAttemptCreateOrConnectWithoutTestInput[]
    upsert?: LiveTestAttemptUpsertWithWhereUniqueWithoutTestInput | LiveTestAttemptUpsertWithWhereUniqueWithoutTestInput[]
    createMany?: LiveTestAttemptCreateManyTestInputEnvelope
    set?: LiveTestAttemptWhereUniqueInput | LiveTestAttemptWhereUniqueInput[]
    disconnect?: LiveTestAttemptWhereUniqueInput | LiveTestAttemptWhereUniqueInput[]
    delete?: LiveTestAttemptWhereUniqueInput | LiveTestAttemptWhereUniqueInput[]
    connect?: LiveTestAttemptWhereUniqueInput | LiveTestAttemptWhereUniqueInput[]
    update?: LiveTestAttemptUpdateWithWhereUniqueWithoutTestInput | LiveTestAttemptUpdateWithWhereUniqueWithoutTestInput[]
    updateMany?: LiveTestAttemptUpdateManyWithWhereWithoutTestInput | LiveTestAttemptUpdateManyWithWhereWithoutTestInput[]
    deleteMany?: LiveTestAttemptScalarWhereInput | LiveTestAttemptScalarWhereInput[]
  }

  export type LiveProctorFlagUpdateManyWithoutTestNestedInput = {
    create?: XOR<LiveProctorFlagCreateWithoutTestInput, LiveProctorFlagUncheckedCreateWithoutTestInput> | LiveProctorFlagCreateWithoutTestInput[] | LiveProctorFlagUncheckedCreateWithoutTestInput[]
    connectOrCreate?: LiveProctorFlagCreateOrConnectWithoutTestInput | LiveProctorFlagCreateOrConnectWithoutTestInput[]
    upsert?: LiveProctorFlagUpsertWithWhereUniqueWithoutTestInput | LiveProctorFlagUpsertWithWhereUniqueWithoutTestInput[]
    createMany?: LiveProctorFlagCreateManyTestInputEnvelope
    set?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
    disconnect?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
    delete?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
    connect?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
    update?: LiveProctorFlagUpdateWithWhereUniqueWithoutTestInput | LiveProctorFlagUpdateWithWhereUniqueWithoutTestInput[]
    updateMany?: LiveProctorFlagUpdateManyWithWhereWithoutTestInput | LiveProctorFlagUpdateManyWithWhereWithoutTestInput[]
    deleteMany?: LiveProctorFlagScalarWhereInput | LiveProctorFlagScalarWhereInput[]
  }

  export type QuestionUncheckedUpdateManyWithoutTestNestedInput = {
    create?: XOR<QuestionCreateWithoutTestInput, QuestionUncheckedCreateWithoutTestInput> | QuestionCreateWithoutTestInput[] | QuestionUncheckedCreateWithoutTestInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutTestInput | QuestionCreateOrConnectWithoutTestInput[]
    upsert?: QuestionUpsertWithWhereUniqueWithoutTestInput | QuestionUpsertWithWhereUniqueWithoutTestInput[]
    createMany?: QuestionCreateManyTestInputEnvelope
    set?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    disconnect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    delete?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    update?: QuestionUpdateWithWhereUniqueWithoutTestInput | QuestionUpdateWithWhereUniqueWithoutTestInput[]
    updateMany?: QuestionUpdateManyWithWhereWithoutTestInput | QuestionUpdateManyWithWhereWithoutTestInput[]
    deleteMany?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
  }

  export type TestScoreUncheckedUpdateManyWithoutTestNestedInput = {
    create?: XOR<TestScoreCreateWithoutTestInput, TestScoreUncheckedCreateWithoutTestInput> | TestScoreCreateWithoutTestInput[] | TestScoreUncheckedCreateWithoutTestInput[]
    connectOrCreate?: TestScoreCreateOrConnectWithoutTestInput | TestScoreCreateOrConnectWithoutTestInput[]
    upsert?: TestScoreUpsertWithWhereUniqueWithoutTestInput | TestScoreUpsertWithWhereUniqueWithoutTestInput[]
    createMany?: TestScoreCreateManyTestInputEnvelope
    set?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
    disconnect?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
    delete?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
    connect?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
    update?: TestScoreUpdateWithWhereUniqueWithoutTestInput | TestScoreUpdateWithWhereUniqueWithoutTestInput[]
    updateMany?: TestScoreUpdateManyWithWhereWithoutTestInput | TestScoreUpdateManyWithWhereWithoutTestInput[]
    deleteMany?: TestScoreScalarWhereInput | TestScoreScalarWhereInput[]
  }

  export type LiveTestAttemptUncheckedUpdateManyWithoutTestNestedInput = {
    create?: XOR<LiveTestAttemptCreateWithoutTestInput, LiveTestAttemptUncheckedCreateWithoutTestInput> | LiveTestAttemptCreateWithoutTestInput[] | LiveTestAttemptUncheckedCreateWithoutTestInput[]
    connectOrCreate?: LiveTestAttemptCreateOrConnectWithoutTestInput | LiveTestAttemptCreateOrConnectWithoutTestInput[]
    upsert?: LiveTestAttemptUpsertWithWhereUniqueWithoutTestInput | LiveTestAttemptUpsertWithWhereUniqueWithoutTestInput[]
    createMany?: LiveTestAttemptCreateManyTestInputEnvelope
    set?: LiveTestAttemptWhereUniqueInput | LiveTestAttemptWhereUniqueInput[]
    disconnect?: LiveTestAttemptWhereUniqueInput | LiveTestAttemptWhereUniqueInput[]
    delete?: LiveTestAttemptWhereUniqueInput | LiveTestAttemptWhereUniqueInput[]
    connect?: LiveTestAttemptWhereUniqueInput | LiveTestAttemptWhereUniqueInput[]
    update?: LiveTestAttemptUpdateWithWhereUniqueWithoutTestInput | LiveTestAttemptUpdateWithWhereUniqueWithoutTestInput[]
    updateMany?: LiveTestAttemptUpdateManyWithWhereWithoutTestInput | LiveTestAttemptUpdateManyWithWhereWithoutTestInput[]
    deleteMany?: LiveTestAttemptScalarWhereInput | LiveTestAttemptScalarWhereInput[]
  }

  export type LiveProctorFlagUncheckedUpdateManyWithoutTestNestedInput = {
    create?: XOR<LiveProctorFlagCreateWithoutTestInput, LiveProctorFlagUncheckedCreateWithoutTestInput> | LiveProctorFlagCreateWithoutTestInput[] | LiveProctorFlagUncheckedCreateWithoutTestInput[]
    connectOrCreate?: LiveProctorFlagCreateOrConnectWithoutTestInput | LiveProctorFlagCreateOrConnectWithoutTestInput[]
    upsert?: LiveProctorFlagUpsertWithWhereUniqueWithoutTestInput | LiveProctorFlagUpsertWithWhereUniqueWithoutTestInput[]
    createMany?: LiveProctorFlagCreateManyTestInputEnvelope
    set?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
    disconnect?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
    delete?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
    connect?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
    update?: LiveProctorFlagUpdateWithWhereUniqueWithoutTestInput | LiveProctorFlagUpdateWithWhereUniqueWithoutTestInput[]
    updateMany?: LiveProctorFlagUpdateManyWithWhereWithoutTestInput | LiveProctorFlagUpdateManyWithWhereWithoutTestInput[]
    deleteMany?: LiveProctorFlagScalarWhereInput | LiveProctorFlagScalarWhereInput[]
  }

  export type TestCreateNestedOneWithoutLiveAttemptsInput = {
    create?: XOR<TestCreateWithoutLiveAttemptsInput, TestUncheckedCreateWithoutLiveAttemptsInput>
    connectOrCreate?: TestCreateOrConnectWithoutLiveAttemptsInput
    connect?: TestWhereUniqueInput
  }

  export type StudentCreateNestedOneWithoutLiveAttemptsInput = {
    create?: XOR<StudentCreateWithoutLiveAttemptsInput, StudentUncheckedCreateWithoutLiveAttemptsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutLiveAttemptsInput
    connect?: StudentWhereUniqueInput
  }

  export type LiveProctorFlagCreateNestedManyWithoutAttemptInput = {
    create?: XOR<LiveProctorFlagCreateWithoutAttemptInput, LiveProctorFlagUncheckedCreateWithoutAttemptInput> | LiveProctorFlagCreateWithoutAttemptInput[] | LiveProctorFlagUncheckedCreateWithoutAttemptInput[]
    connectOrCreate?: LiveProctorFlagCreateOrConnectWithoutAttemptInput | LiveProctorFlagCreateOrConnectWithoutAttemptInput[]
    createMany?: LiveProctorFlagCreateManyAttemptInputEnvelope
    connect?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
  }

  export type LiveProctorFlagUncheckedCreateNestedManyWithoutAttemptInput = {
    create?: XOR<LiveProctorFlagCreateWithoutAttemptInput, LiveProctorFlagUncheckedCreateWithoutAttemptInput> | LiveProctorFlagCreateWithoutAttemptInput[] | LiveProctorFlagUncheckedCreateWithoutAttemptInput[]
    connectOrCreate?: LiveProctorFlagCreateOrConnectWithoutAttemptInput | LiveProctorFlagCreateOrConnectWithoutAttemptInput[]
    createMany?: LiveProctorFlagCreateManyAttemptInputEnvelope
    connect?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TestUpdateOneRequiredWithoutLiveAttemptsNestedInput = {
    create?: XOR<TestCreateWithoutLiveAttemptsInput, TestUncheckedCreateWithoutLiveAttemptsInput>
    connectOrCreate?: TestCreateOrConnectWithoutLiveAttemptsInput
    upsert?: TestUpsertWithoutLiveAttemptsInput
    connect?: TestWhereUniqueInput
    update?: XOR<XOR<TestUpdateToOneWithWhereWithoutLiveAttemptsInput, TestUpdateWithoutLiveAttemptsInput>, TestUncheckedUpdateWithoutLiveAttemptsInput>
  }

  export type StudentUpdateOneRequiredWithoutLiveAttemptsNestedInput = {
    create?: XOR<StudentCreateWithoutLiveAttemptsInput, StudentUncheckedCreateWithoutLiveAttemptsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutLiveAttemptsInput
    upsert?: StudentUpsertWithoutLiveAttemptsInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutLiveAttemptsInput, StudentUpdateWithoutLiveAttemptsInput>, StudentUncheckedUpdateWithoutLiveAttemptsInput>
  }

  export type LiveProctorFlagUpdateManyWithoutAttemptNestedInput = {
    create?: XOR<LiveProctorFlagCreateWithoutAttemptInput, LiveProctorFlagUncheckedCreateWithoutAttemptInput> | LiveProctorFlagCreateWithoutAttemptInput[] | LiveProctorFlagUncheckedCreateWithoutAttemptInput[]
    connectOrCreate?: LiveProctorFlagCreateOrConnectWithoutAttemptInput | LiveProctorFlagCreateOrConnectWithoutAttemptInput[]
    upsert?: LiveProctorFlagUpsertWithWhereUniqueWithoutAttemptInput | LiveProctorFlagUpsertWithWhereUniqueWithoutAttemptInput[]
    createMany?: LiveProctorFlagCreateManyAttemptInputEnvelope
    set?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
    disconnect?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
    delete?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
    connect?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
    update?: LiveProctorFlagUpdateWithWhereUniqueWithoutAttemptInput | LiveProctorFlagUpdateWithWhereUniqueWithoutAttemptInput[]
    updateMany?: LiveProctorFlagUpdateManyWithWhereWithoutAttemptInput | LiveProctorFlagUpdateManyWithWhereWithoutAttemptInput[]
    deleteMany?: LiveProctorFlagScalarWhereInput | LiveProctorFlagScalarWhereInput[]
  }

  export type LiveProctorFlagUncheckedUpdateManyWithoutAttemptNestedInput = {
    create?: XOR<LiveProctorFlagCreateWithoutAttemptInput, LiveProctorFlagUncheckedCreateWithoutAttemptInput> | LiveProctorFlagCreateWithoutAttemptInput[] | LiveProctorFlagUncheckedCreateWithoutAttemptInput[]
    connectOrCreate?: LiveProctorFlagCreateOrConnectWithoutAttemptInput | LiveProctorFlagCreateOrConnectWithoutAttemptInput[]
    upsert?: LiveProctorFlagUpsertWithWhereUniqueWithoutAttemptInput | LiveProctorFlagUpsertWithWhereUniqueWithoutAttemptInput[]
    createMany?: LiveProctorFlagCreateManyAttemptInputEnvelope
    set?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
    disconnect?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
    delete?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
    connect?: LiveProctorFlagWhereUniqueInput | LiveProctorFlagWhereUniqueInput[]
    update?: LiveProctorFlagUpdateWithWhereUniqueWithoutAttemptInput | LiveProctorFlagUpdateWithWhereUniqueWithoutAttemptInput[]
    updateMany?: LiveProctorFlagUpdateManyWithWhereWithoutAttemptInput | LiveProctorFlagUpdateManyWithWhereWithoutAttemptInput[]
    deleteMany?: LiveProctorFlagScalarWhereInput | LiveProctorFlagScalarWhereInput[]
  }

  export type TestCreateNestedOneWithoutProctorFlagsInput = {
    create?: XOR<TestCreateWithoutProctorFlagsInput, TestUncheckedCreateWithoutProctorFlagsInput>
    connectOrCreate?: TestCreateOrConnectWithoutProctorFlagsInput
    connect?: TestWhereUniqueInput
  }

  export type StudentCreateNestedOneWithoutProctorFlagsInput = {
    create?: XOR<StudentCreateWithoutProctorFlagsInput, StudentUncheckedCreateWithoutProctorFlagsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutProctorFlagsInput
    connect?: StudentWhereUniqueInput
  }

  export type LiveTestAttemptCreateNestedOneWithoutProctorFlagsInput = {
    create?: XOR<LiveTestAttemptCreateWithoutProctorFlagsInput, LiveTestAttemptUncheckedCreateWithoutProctorFlagsInput>
    connectOrCreate?: LiveTestAttemptCreateOrConnectWithoutProctorFlagsInput
    connect?: LiveTestAttemptWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutProctorFlagsInput = {
    create?: XOR<UserCreateWithoutProctorFlagsInput, UserUncheckedCreateWithoutProctorFlagsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProctorFlagsInput
    connect?: UserWhereUniqueInput
  }

  export type TestUpdateOneRequiredWithoutProctorFlagsNestedInput = {
    create?: XOR<TestCreateWithoutProctorFlagsInput, TestUncheckedCreateWithoutProctorFlagsInput>
    connectOrCreate?: TestCreateOrConnectWithoutProctorFlagsInput
    upsert?: TestUpsertWithoutProctorFlagsInput
    connect?: TestWhereUniqueInput
    update?: XOR<XOR<TestUpdateToOneWithWhereWithoutProctorFlagsInput, TestUpdateWithoutProctorFlagsInput>, TestUncheckedUpdateWithoutProctorFlagsInput>
  }

  export type StudentUpdateOneRequiredWithoutProctorFlagsNestedInput = {
    create?: XOR<StudentCreateWithoutProctorFlagsInput, StudentUncheckedCreateWithoutProctorFlagsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutProctorFlagsInput
    upsert?: StudentUpsertWithoutProctorFlagsInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutProctorFlagsInput, StudentUpdateWithoutProctorFlagsInput>, StudentUncheckedUpdateWithoutProctorFlagsInput>
  }

  export type LiveTestAttemptUpdateOneWithoutProctorFlagsNestedInput = {
    create?: XOR<LiveTestAttemptCreateWithoutProctorFlagsInput, LiveTestAttemptUncheckedCreateWithoutProctorFlagsInput>
    connectOrCreate?: LiveTestAttemptCreateOrConnectWithoutProctorFlagsInput
    upsert?: LiveTestAttemptUpsertWithoutProctorFlagsInput
    disconnect?: LiveTestAttemptWhereInput | boolean
    delete?: LiveTestAttemptWhereInput | boolean
    connect?: LiveTestAttemptWhereUniqueInput
    update?: XOR<XOR<LiveTestAttemptUpdateToOneWithWhereWithoutProctorFlagsInput, LiveTestAttemptUpdateWithoutProctorFlagsInput>, LiveTestAttemptUncheckedUpdateWithoutProctorFlagsInput>
  }

  export type UserUpdateOneRequiredWithoutProctorFlagsNestedInput = {
    create?: XOR<UserCreateWithoutProctorFlagsInput, UserUncheckedCreateWithoutProctorFlagsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProctorFlagsInput
    upsert?: UserUpsertWithoutProctorFlagsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProctorFlagsInput, UserUpdateWithoutProctorFlagsInput>, UserUncheckedUpdateWithoutProctorFlagsInput>
  }

  export type TestCreateNestedOneWithoutQuestionsInput = {
    create?: XOR<TestCreateWithoutQuestionsInput, TestUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: TestCreateOrConnectWithoutQuestionsInput
    connect?: TestWhereUniqueInput
  }

  export type EnumQuestionTypeFieldUpdateOperationsInput = {
    set?: $Enums.QuestionType
  }

  export type TestUpdateOneRequiredWithoutQuestionsNestedInput = {
    create?: XOR<TestCreateWithoutQuestionsInput, TestUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: TestCreateOrConnectWithoutQuestionsInput
    upsert?: TestUpsertWithoutQuestionsInput
    connect?: TestWhereUniqueInput
    update?: XOR<XOR<TestUpdateToOneWithWhereWithoutQuestionsInput, TestUpdateWithoutQuestionsInput>, TestUncheckedUpdateWithoutQuestionsInput>
  }

  export type StudentCreateNestedOneWithoutTestScoresInput = {
    create?: XOR<StudentCreateWithoutTestScoresInput, StudentUncheckedCreateWithoutTestScoresInput>
    connectOrCreate?: StudentCreateOrConnectWithoutTestScoresInput
    connect?: StudentWhereUniqueInput
  }

  export type TestCreateNestedOneWithoutTestScoresInput = {
    create?: XOR<TestCreateWithoutTestScoresInput, TestUncheckedCreateWithoutTestScoresInput>
    connectOrCreate?: TestCreateOrConnectWithoutTestScoresInput
    connect?: TestWhereUniqueInput
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type StudentUpdateOneRequiredWithoutTestScoresNestedInput = {
    create?: XOR<StudentCreateWithoutTestScoresInput, StudentUncheckedCreateWithoutTestScoresInput>
    connectOrCreate?: StudentCreateOrConnectWithoutTestScoresInput
    upsert?: StudentUpsertWithoutTestScoresInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutTestScoresInput, StudentUpdateWithoutTestScoresInput>, StudentUncheckedUpdateWithoutTestScoresInput>
  }

  export type TestUpdateOneRequiredWithoutTestScoresNestedInput = {
    create?: XOR<TestCreateWithoutTestScoresInput, TestUncheckedCreateWithoutTestScoresInput>
    connectOrCreate?: TestCreateOrConnectWithoutTestScoresInput
    upsert?: TestUpsertWithoutTestScoresInput
    connect?: TestWhereUniqueInput
    update?: XOR<XOR<TestUpdateToOneWithWhereWithoutTestScoresInput, TestUpdateWithoutTestScoresInput>, TestUncheckedUpdateWithoutTestScoresInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumDifficultyFilter<$PrismaModel = never> = {
    equals?: $Enums.Difficulty | EnumDifficultyFieldRefInput<$PrismaModel>
    in?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    not?: NestedEnumDifficultyFilter<$PrismaModel> | $Enums.Difficulty
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumDifficultyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Difficulty | EnumDifficultyFieldRefInput<$PrismaModel>
    in?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    not?: NestedEnumDifficultyWithAggregatesFilter<$PrismaModel> | $Enums.Difficulty
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDifficultyFilter<$PrismaModel>
    _max?: NestedEnumDifficultyFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumQuestionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | EnumQuestionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumQuestionTypeFilter<$PrismaModel> | $Enums.QuestionType
  }

  export type NestedEnumQuestionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | EnumQuestionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumQuestionTypeWithAggregatesFilter<$PrismaModel> | $Enums.QuestionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQuestionTypeFilter<$PrismaModel>
    _max?: NestedEnumQuestionTypeFilter<$PrismaModel>
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type TestCreateWithoutCreatedByInput = {
    id?: string
    name: string
    description?: string | null
    subjectName?: string
    totalMarks?: number | null
    numberOfQuestions?: number | null
    difficulty?: $Enums.Difficulty
    slug: string
    settings?: string
    visibility?: boolean
    isScheduled?: boolean
    startTime?: Date | string | null
    duration?: number | null
    allowRetake?: boolean
    showResults?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionCreateNestedManyWithoutTestInput
    testScores?: TestScoreCreateNestedManyWithoutTestInput
    liveAttempts?: LiveTestAttemptCreateNestedManyWithoutTestInput
    proctorFlags?: LiveProctorFlagCreateNestedManyWithoutTestInput
  }

  export type TestUncheckedCreateWithoutCreatedByInput = {
    id?: string
    name: string
    description?: string | null
    subjectName?: string
    totalMarks?: number | null
    numberOfQuestions?: number | null
    difficulty?: $Enums.Difficulty
    slug: string
    settings?: string
    visibility?: boolean
    isScheduled?: boolean
    startTime?: Date | string | null
    duration?: number | null
    allowRetake?: boolean
    showResults?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionUncheckedCreateNestedManyWithoutTestInput
    testScores?: TestScoreUncheckedCreateNestedManyWithoutTestInput
    liveAttempts?: LiveTestAttemptUncheckedCreateNestedManyWithoutTestInput
    proctorFlags?: LiveProctorFlagUncheckedCreateNestedManyWithoutTestInput
  }

  export type TestCreateOrConnectWithoutCreatedByInput = {
    where: TestWhereUniqueInput
    create: XOR<TestCreateWithoutCreatedByInput, TestUncheckedCreateWithoutCreatedByInput>
  }

  export type TestCreateManyCreatedByInputEnvelope = {
    data: TestCreateManyCreatedByInput | TestCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type StudentCreateWithoutCreatedByInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    testScores?: TestScoreCreateNestedManyWithoutStudentInput
    liveAttempts?: LiveTestAttemptCreateNestedManyWithoutStudentInput
    proctorFlags?: LiveProctorFlagCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutCreatedByInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    testScores?: TestScoreUncheckedCreateNestedManyWithoutStudentInput
    liveAttempts?: LiveTestAttemptUncheckedCreateNestedManyWithoutStudentInput
    proctorFlags?: LiveProctorFlagUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutCreatedByInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutCreatedByInput, StudentUncheckedCreateWithoutCreatedByInput>
  }

  export type StudentCreateManyCreatedByInputEnvelope = {
    data: StudentCreateManyCreatedByInput | StudentCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type LiveProctorFlagCreateWithoutProctorInput = {
    id?: string
    note?: string | null
    createdAt?: Date | string
    test: TestCreateNestedOneWithoutProctorFlagsInput
    student: StudentCreateNestedOneWithoutProctorFlagsInput
    attempt?: LiveTestAttemptCreateNestedOneWithoutProctorFlagsInput
  }

  export type LiveProctorFlagUncheckedCreateWithoutProctorInput = {
    id?: string
    testId: string
    studentId: string
    attemptId?: string | null
    note?: string | null
    createdAt?: Date | string
  }

  export type LiveProctorFlagCreateOrConnectWithoutProctorInput = {
    where: LiveProctorFlagWhereUniqueInput
    create: XOR<LiveProctorFlagCreateWithoutProctorInput, LiveProctorFlagUncheckedCreateWithoutProctorInput>
  }

  export type LiveProctorFlagCreateManyProctorInputEnvelope = {
    data: LiveProctorFlagCreateManyProctorInput | LiveProctorFlagCreateManyProctorInput[]
    skipDuplicates?: boolean
  }

  export type LoginSessionCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type LoginSessionUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type LoginSessionCreateOrConnectWithoutUserInput = {
    where: LoginSessionWhereUniqueInput
    create: XOR<LoginSessionCreateWithoutUserInput, LoginSessionUncheckedCreateWithoutUserInput>
  }

  export type LoginSessionCreateManyUserInputEnvelope = {
    data: LoginSessionCreateManyUserInput | LoginSessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TestUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: TestWhereUniqueInput
    update: XOR<TestUpdateWithoutCreatedByInput, TestUncheckedUpdateWithoutCreatedByInput>
    create: XOR<TestCreateWithoutCreatedByInput, TestUncheckedCreateWithoutCreatedByInput>
  }

  export type TestUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: TestWhereUniqueInput
    data: XOR<TestUpdateWithoutCreatedByInput, TestUncheckedUpdateWithoutCreatedByInput>
  }

  export type TestUpdateManyWithWhereWithoutCreatedByInput = {
    where: TestScalarWhereInput
    data: XOR<TestUpdateManyMutationInput, TestUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type TestScalarWhereInput = {
    AND?: TestScalarWhereInput | TestScalarWhereInput[]
    OR?: TestScalarWhereInput[]
    NOT?: TestScalarWhereInput | TestScalarWhereInput[]
    id?: StringFilter<"Test"> | string
    name?: StringFilter<"Test"> | string
    description?: StringNullableFilter<"Test"> | string | null
    subjectName?: StringFilter<"Test"> | string
    totalMarks?: IntNullableFilter<"Test"> | number | null
    numberOfQuestions?: IntNullableFilter<"Test"> | number | null
    difficulty?: EnumDifficultyFilter<"Test"> | $Enums.Difficulty
    slug?: StringFilter<"Test"> | string
    settings?: StringFilter<"Test"> | string
    visibility?: BoolFilter<"Test"> | boolean
    isScheduled?: BoolFilter<"Test"> | boolean
    startTime?: DateTimeNullableFilter<"Test"> | Date | string | null
    duration?: IntNullableFilter<"Test"> | number | null
    allowRetake?: BoolFilter<"Test"> | boolean
    showResults?: BoolFilter<"Test"> | boolean
    createdById?: StringFilter<"Test"> | string
    createdAt?: DateTimeFilter<"Test"> | Date | string
    updatedAt?: DateTimeFilter<"Test"> | Date | string
  }

  export type StudentUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: StudentWhereUniqueInput
    update: XOR<StudentUpdateWithoutCreatedByInput, StudentUncheckedUpdateWithoutCreatedByInput>
    create: XOR<StudentCreateWithoutCreatedByInput, StudentUncheckedCreateWithoutCreatedByInput>
  }

  export type StudentUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: StudentWhereUniqueInput
    data: XOR<StudentUpdateWithoutCreatedByInput, StudentUncheckedUpdateWithoutCreatedByInput>
  }

  export type StudentUpdateManyWithWhereWithoutCreatedByInput = {
    where: StudentScalarWhereInput
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type StudentScalarWhereInput = {
    AND?: StudentScalarWhereInput | StudentScalarWhereInput[]
    OR?: StudentScalarWhereInput[]
    NOT?: StudentScalarWhereInput | StudentScalarWhereInput[]
    id?: StringFilter<"Student"> | string
    firstName?: StringFilter<"Student"> | string
    lastName?: StringFilter<"Student"> | string
    email?: StringFilter<"Student"> | string
    createdById?: StringFilter<"Student"> | string
    createdAt?: DateTimeFilter<"Student"> | Date | string
    updatedAt?: DateTimeFilter<"Student"> | Date | string
  }

  export type LiveProctorFlagUpsertWithWhereUniqueWithoutProctorInput = {
    where: LiveProctorFlagWhereUniqueInput
    update: XOR<LiveProctorFlagUpdateWithoutProctorInput, LiveProctorFlagUncheckedUpdateWithoutProctorInput>
    create: XOR<LiveProctorFlagCreateWithoutProctorInput, LiveProctorFlagUncheckedCreateWithoutProctorInput>
  }

  export type LiveProctorFlagUpdateWithWhereUniqueWithoutProctorInput = {
    where: LiveProctorFlagWhereUniqueInput
    data: XOR<LiveProctorFlagUpdateWithoutProctorInput, LiveProctorFlagUncheckedUpdateWithoutProctorInput>
  }

  export type LiveProctorFlagUpdateManyWithWhereWithoutProctorInput = {
    where: LiveProctorFlagScalarWhereInput
    data: XOR<LiveProctorFlagUpdateManyMutationInput, LiveProctorFlagUncheckedUpdateManyWithoutProctorInput>
  }

  export type LiveProctorFlagScalarWhereInput = {
    AND?: LiveProctorFlagScalarWhereInput | LiveProctorFlagScalarWhereInput[]
    OR?: LiveProctorFlagScalarWhereInput[]
    NOT?: LiveProctorFlagScalarWhereInput | LiveProctorFlagScalarWhereInput[]
    id?: StringFilter<"LiveProctorFlag"> | string
    testId?: StringFilter<"LiveProctorFlag"> | string
    studentId?: StringFilter<"LiveProctorFlag"> | string
    attemptId?: StringNullableFilter<"LiveProctorFlag"> | string | null
    proctorId?: StringFilter<"LiveProctorFlag"> | string
    note?: StringNullableFilter<"LiveProctorFlag"> | string | null
    createdAt?: DateTimeFilter<"LiveProctorFlag"> | Date | string
  }

  export type LoginSessionUpsertWithWhereUniqueWithoutUserInput = {
    where: LoginSessionWhereUniqueInput
    update: XOR<LoginSessionUpdateWithoutUserInput, LoginSessionUncheckedUpdateWithoutUserInput>
    create: XOR<LoginSessionCreateWithoutUserInput, LoginSessionUncheckedCreateWithoutUserInput>
  }

  export type LoginSessionUpdateWithWhereUniqueWithoutUserInput = {
    where: LoginSessionWhereUniqueInput
    data: XOR<LoginSessionUpdateWithoutUserInput, LoginSessionUncheckedUpdateWithoutUserInput>
  }

  export type LoginSessionUpdateManyWithWhereWithoutUserInput = {
    where: LoginSessionScalarWhereInput
    data: XOR<LoginSessionUpdateManyMutationInput, LoginSessionUncheckedUpdateManyWithoutUserInput>
  }

  export type LoginSessionScalarWhereInput = {
    AND?: LoginSessionScalarWhereInput | LoginSessionScalarWhereInput[]
    OR?: LoginSessionScalarWhereInput[]
    NOT?: LoginSessionScalarWhereInput | LoginSessionScalarWhereInput[]
    id?: StringFilter<"LoginSession"> | string
    token?: StringFilter<"LoginSession"> | string
    expiresAt?: DateTimeFilter<"LoginSession"> | Date | string
    createdAt?: DateTimeFilter<"LoginSession"> | Date | string
    userId?: StringFilter<"LoginSession"> | string
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    username?: string | null
    passwordHash?: string | null
    uniqueId?: string | null
    image?: string | null
    gender?: $Enums.Gender
    phone?: string | null
    city?: string | null
    accountId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tests?: TestCreateNestedManyWithoutCreatedByInput
    studentsCreated?: StudentCreateNestedManyWithoutCreatedByInput
    proctorFlags?: LiveProctorFlagCreateNestedManyWithoutProctorInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    username?: string | null
    passwordHash?: string | null
    uniqueId?: string | null
    image?: string | null
    gender?: $Enums.Gender
    phone?: string | null
    city?: string | null
    accountId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tests?: TestUncheckedCreateNestedManyWithoutCreatedByInput
    studentsCreated?: StudentUncheckedCreateNestedManyWithoutCreatedByInput
    proctorFlags?: LiveProctorFlagUncheckedCreateNestedManyWithoutProctorInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    uniqueId?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    accountId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tests?: TestUpdateManyWithoutCreatedByNestedInput
    studentsCreated?: StudentUpdateManyWithoutCreatedByNestedInput
    proctorFlags?: LiveProctorFlagUpdateManyWithoutProctorNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    uniqueId?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    accountId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tests?: TestUncheckedUpdateManyWithoutCreatedByNestedInput
    studentsCreated?: StudentUncheckedUpdateManyWithoutCreatedByNestedInput
    proctorFlags?: LiveProctorFlagUncheckedUpdateManyWithoutProctorNestedInput
  }

  export type UserCreateWithoutStudentsCreatedInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    username?: string | null
    passwordHash?: string | null
    uniqueId?: string | null
    image?: string | null
    gender?: $Enums.Gender
    phone?: string | null
    city?: string | null
    accountId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tests?: TestCreateNestedManyWithoutCreatedByInput
    proctorFlags?: LiveProctorFlagCreateNestedManyWithoutProctorInput
    sessions?: LoginSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutStudentsCreatedInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    username?: string | null
    passwordHash?: string | null
    uniqueId?: string | null
    image?: string | null
    gender?: $Enums.Gender
    phone?: string | null
    city?: string | null
    accountId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tests?: TestUncheckedCreateNestedManyWithoutCreatedByInput
    proctorFlags?: LiveProctorFlagUncheckedCreateNestedManyWithoutProctorInput
    sessions?: LoginSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutStudentsCreatedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStudentsCreatedInput, UserUncheckedCreateWithoutStudentsCreatedInput>
  }

  export type TestScoreCreateWithoutStudentInput = {
    id?: string
    score: number
    totalMarks: number
    passed?: boolean | null
    remarks?: string | null
    gradedAt?: Date | string | null
    answers?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    test: TestCreateNestedOneWithoutTestScoresInput
  }

  export type TestScoreUncheckedCreateWithoutStudentInput = {
    id?: string
    testId: string
    score: number
    totalMarks: number
    passed?: boolean | null
    remarks?: string | null
    gradedAt?: Date | string | null
    answers?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TestScoreCreateOrConnectWithoutStudentInput = {
    where: TestScoreWhereUniqueInput
    create: XOR<TestScoreCreateWithoutStudentInput, TestScoreUncheckedCreateWithoutStudentInput>
  }

  export type TestScoreCreateManyStudentInputEnvelope = {
    data: TestScoreCreateManyStudentInput | TestScoreCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type LiveTestAttemptCreateWithoutStudentInput = {
    id?: string
    passwordUsed?: boolean
    setupCompleted?: boolean
    startedAt?: Date | string
    examStartedAt?: Date | string | null
    submittedAt?: Date | string | null
    answers?: string
    flagged?: string
    score?: number | null
    totalMarks?: number | null
    violationFlags?: JsonNullValueInput | InputJsonValue
    proctorDeductions?: number
    timePenaltySeconds?: number
    examCurrentIndex?: number
    endedByProctor?: boolean
    endReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    test: TestCreateNestedOneWithoutLiveAttemptsInput
    proctorFlags?: LiveProctorFlagCreateNestedManyWithoutAttemptInput
  }

  export type LiveTestAttemptUncheckedCreateWithoutStudentInput = {
    id?: string
    testId: string
    passwordUsed?: boolean
    setupCompleted?: boolean
    startedAt?: Date | string
    examStartedAt?: Date | string | null
    submittedAt?: Date | string | null
    answers?: string
    flagged?: string
    score?: number | null
    totalMarks?: number | null
    violationFlags?: JsonNullValueInput | InputJsonValue
    proctorDeductions?: number
    timePenaltySeconds?: number
    examCurrentIndex?: number
    endedByProctor?: boolean
    endReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    proctorFlags?: LiveProctorFlagUncheckedCreateNestedManyWithoutAttemptInput
  }

  export type LiveTestAttemptCreateOrConnectWithoutStudentInput = {
    where: LiveTestAttemptWhereUniqueInput
    create: XOR<LiveTestAttemptCreateWithoutStudentInput, LiveTestAttemptUncheckedCreateWithoutStudentInput>
  }

  export type LiveTestAttemptCreateManyStudentInputEnvelope = {
    data: LiveTestAttemptCreateManyStudentInput | LiveTestAttemptCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type LiveProctorFlagCreateWithoutStudentInput = {
    id?: string
    note?: string | null
    createdAt?: Date | string
    test: TestCreateNestedOneWithoutProctorFlagsInput
    attempt?: LiveTestAttemptCreateNestedOneWithoutProctorFlagsInput
    proctor: UserCreateNestedOneWithoutProctorFlagsInput
  }

  export type LiveProctorFlagUncheckedCreateWithoutStudentInput = {
    id?: string
    testId: string
    attemptId?: string | null
    proctorId: string
    note?: string | null
    createdAt?: Date | string
  }

  export type LiveProctorFlagCreateOrConnectWithoutStudentInput = {
    where: LiveProctorFlagWhereUniqueInput
    create: XOR<LiveProctorFlagCreateWithoutStudentInput, LiveProctorFlagUncheckedCreateWithoutStudentInput>
  }

  export type LiveProctorFlagCreateManyStudentInputEnvelope = {
    data: LiveProctorFlagCreateManyStudentInput | LiveProctorFlagCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutStudentsCreatedInput = {
    update: XOR<UserUpdateWithoutStudentsCreatedInput, UserUncheckedUpdateWithoutStudentsCreatedInput>
    create: XOR<UserCreateWithoutStudentsCreatedInput, UserUncheckedCreateWithoutStudentsCreatedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStudentsCreatedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStudentsCreatedInput, UserUncheckedUpdateWithoutStudentsCreatedInput>
  }

  export type UserUpdateWithoutStudentsCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    uniqueId?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    accountId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tests?: TestUpdateManyWithoutCreatedByNestedInput
    proctorFlags?: LiveProctorFlagUpdateManyWithoutProctorNestedInput
    sessions?: LoginSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutStudentsCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    uniqueId?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    accountId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tests?: TestUncheckedUpdateManyWithoutCreatedByNestedInput
    proctorFlags?: LiveProctorFlagUncheckedUpdateManyWithoutProctorNestedInput
    sessions?: LoginSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TestScoreUpsertWithWhereUniqueWithoutStudentInput = {
    where: TestScoreWhereUniqueInput
    update: XOR<TestScoreUpdateWithoutStudentInput, TestScoreUncheckedUpdateWithoutStudentInput>
    create: XOR<TestScoreCreateWithoutStudentInput, TestScoreUncheckedCreateWithoutStudentInput>
  }

  export type TestScoreUpdateWithWhereUniqueWithoutStudentInput = {
    where: TestScoreWhereUniqueInput
    data: XOR<TestScoreUpdateWithoutStudentInput, TestScoreUncheckedUpdateWithoutStudentInput>
  }

  export type TestScoreUpdateManyWithWhereWithoutStudentInput = {
    where: TestScoreScalarWhereInput
    data: XOR<TestScoreUpdateManyMutationInput, TestScoreUncheckedUpdateManyWithoutStudentInput>
  }

  export type TestScoreScalarWhereInput = {
    AND?: TestScoreScalarWhereInput | TestScoreScalarWhereInput[]
    OR?: TestScoreScalarWhereInput[]
    NOT?: TestScoreScalarWhereInput | TestScoreScalarWhereInput[]
    id?: StringFilter<"TestScore"> | string
    studentId?: StringFilter<"TestScore"> | string
    testId?: StringFilter<"TestScore"> | string
    score?: IntFilter<"TestScore"> | number
    totalMarks?: IntFilter<"TestScore"> | number
    passed?: BoolNullableFilter<"TestScore"> | boolean | null
    remarks?: StringNullableFilter<"TestScore"> | string | null
    gradedAt?: DateTimeNullableFilter<"TestScore"> | Date | string | null
    answers?: StringFilter<"TestScore"> | string
    createdAt?: DateTimeFilter<"TestScore"> | Date | string
    updatedAt?: DateTimeFilter<"TestScore"> | Date | string
  }

  export type LiveTestAttemptUpsertWithWhereUniqueWithoutStudentInput = {
    where: LiveTestAttemptWhereUniqueInput
    update: XOR<LiveTestAttemptUpdateWithoutStudentInput, LiveTestAttemptUncheckedUpdateWithoutStudentInput>
    create: XOR<LiveTestAttemptCreateWithoutStudentInput, LiveTestAttemptUncheckedCreateWithoutStudentInput>
  }

  export type LiveTestAttemptUpdateWithWhereUniqueWithoutStudentInput = {
    where: LiveTestAttemptWhereUniqueInput
    data: XOR<LiveTestAttemptUpdateWithoutStudentInput, LiveTestAttemptUncheckedUpdateWithoutStudentInput>
  }

  export type LiveTestAttemptUpdateManyWithWhereWithoutStudentInput = {
    where: LiveTestAttemptScalarWhereInput
    data: XOR<LiveTestAttemptUpdateManyMutationInput, LiveTestAttemptUncheckedUpdateManyWithoutStudentInput>
  }

  export type LiveTestAttemptScalarWhereInput = {
    AND?: LiveTestAttemptScalarWhereInput | LiveTestAttemptScalarWhereInput[]
    OR?: LiveTestAttemptScalarWhereInput[]
    NOT?: LiveTestAttemptScalarWhereInput | LiveTestAttemptScalarWhereInput[]
    id?: StringFilter<"LiveTestAttempt"> | string
    testId?: StringFilter<"LiveTestAttempt"> | string
    studentId?: StringFilter<"LiveTestAttempt"> | string
    passwordUsed?: BoolFilter<"LiveTestAttempt"> | boolean
    setupCompleted?: BoolFilter<"LiveTestAttempt"> | boolean
    startedAt?: DateTimeFilter<"LiveTestAttempt"> | Date | string
    examStartedAt?: DateTimeNullableFilter<"LiveTestAttempt"> | Date | string | null
    submittedAt?: DateTimeNullableFilter<"LiveTestAttempt"> | Date | string | null
    answers?: StringFilter<"LiveTestAttempt"> | string
    flagged?: StringFilter<"LiveTestAttempt"> | string
    score?: IntNullableFilter<"LiveTestAttempt"> | number | null
    totalMarks?: IntNullableFilter<"LiveTestAttempt"> | number | null
    violationFlags?: JsonFilter<"LiveTestAttempt">
    proctorDeductions?: IntFilter<"LiveTestAttempt"> | number
    timePenaltySeconds?: IntFilter<"LiveTestAttempt"> | number
    examCurrentIndex?: IntFilter<"LiveTestAttempt"> | number
    endedByProctor?: BoolFilter<"LiveTestAttempt"> | boolean
    endReason?: StringNullableFilter<"LiveTestAttempt"> | string | null
    createdAt?: DateTimeFilter<"LiveTestAttempt"> | Date | string
    updatedAt?: DateTimeFilter<"LiveTestAttempt"> | Date | string
  }

  export type LiveProctorFlagUpsertWithWhereUniqueWithoutStudentInput = {
    where: LiveProctorFlagWhereUniqueInput
    update: XOR<LiveProctorFlagUpdateWithoutStudentInput, LiveProctorFlagUncheckedUpdateWithoutStudentInput>
    create: XOR<LiveProctorFlagCreateWithoutStudentInput, LiveProctorFlagUncheckedCreateWithoutStudentInput>
  }

  export type LiveProctorFlagUpdateWithWhereUniqueWithoutStudentInput = {
    where: LiveProctorFlagWhereUniqueInput
    data: XOR<LiveProctorFlagUpdateWithoutStudentInput, LiveProctorFlagUncheckedUpdateWithoutStudentInput>
  }

  export type LiveProctorFlagUpdateManyWithWhereWithoutStudentInput = {
    where: LiveProctorFlagScalarWhereInput
    data: XOR<LiveProctorFlagUpdateManyMutationInput, LiveProctorFlagUncheckedUpdateManyWithoutStudentInput>
  }

  export type UserCreateWithoutTestsInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    username?: string | null
    passwordHash?: string | null
    uniqueId?: string | null
    image?: string | null
    gender?: $Enums.Gender
    phone?: string | null
    city?: string | null
    accountId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    studentsCreated?: StudentCreateNestedManyWithoutCreatedByInput
    proctorFlags?: LiveProctorFlagCreateNestedManyWithoutProctorInput
    sessions?: LoginSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTestsInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    username?: string | null
    passwordHash?: string | null
    uniqueId?: string | null
    image?: string | null
    gender?: $Enums.Gender
    phone?: string | null
    city?: string | null
    accountId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    studentsCreated?: StudentUncheckedCreateNestedManyWithoutCreatedByInput
    proctorFlags?: LiveProctorFlagUncheckedCreateNestedManyWithoutProctorInput
    sessions?: LoginSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTestsInput, UserUncheckedCreateWithoutTestsInput>
  }

  export type QuestionCreateWithoutTestInput = {
    id?: string
    text: string
    type: $Enums.QuestionType
    options?: string | null
    correctOption?: number | null
    correctAnswer?: string | null
    marks: number
    explanation?: string | null
    order?: number
  }

  export type QuestionUncheckedCreateWithoutTestInput = {
    id?: string
    text: string
    type: $Enums.QuestionType
    options?: string | null
    correctOption?: number | null
    correctAnswer?: string | null
    marks: number
    explanation?: string | null
    order?: number
  }

  export type QuestionCreateOrConnectWithoutTestInput = {
    where: QuestionWhereUniqueInput
    create: XOR<QuestionCreateWithoutTestInput, QuestionUncheckedCreateWithoutTestInput>
  }

  export type QuestionCreateManyTestInputEnvelope = {
    data: QuestionCreateManyTestInput | QuestionCreateManyTestInput[]
    skipDuplicates?: boolean
  }

  export type TestScoreCreateWithoutTestInput = {
    id?: string
    score: number
    totalMarks: number
    passed?: boolean | null
    remarks?: string | null
    gradedAt?: Date | string | null
    answers?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    student: StudentCreateNestedOneWithoutTestScoresInput
  }

  export type TestScoreUncheckedCreateWithoutTestInput = {
    id?: string
    studentId: string
    score: number
    totalMarks: number
    passed?: boolean | null
    remarks?: string | null
    gradedAt?: Date | string | null
    answers?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TestScoreCreateOrConnectWithoutTestInput = {
    where: TestScoreWhereUniqueInput
    create: XOR<TestScoreCreateWithoutTestInput, TestScoreUncheckedCreateWithoutTestInput>
  }

  export type TestScoreCreateManyTestInputEnvelope = {
    data: TestScoreCreateManyTestInput | TestScoreCreateManyTestInput[]
    skipDuplicates?: boolean
  }

  export type LiveTestAttemptCreateWithoutTestInput = {
    id?: string
    passwordUsed?: boolean
    setupCompleted?: boolean
    startedAt?: Date | string
    examStartedAt?: Date | string | null
    submittedAt?: Date | string | null
    answers?: string
    flagged?: string
    score?: number | null
    totalMarks?: number | null
    violationFlags?: JsonNullValueInput | InputJsonValue
    proctorDeductions?: number
    timePenaltySeconds?: number
    examCurrentIndex?: number
    endedByProctor?: boolean
    endReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    student: StudentCreateNestedOneWithoutLiveAttemptsInput
    proctorFlags?: LiveProctorFlagCreateNestedManyWithoutAttemptInput
  }

  export type LiveTestAttemptUncheckedCreateWithoutTestInput = {
    id?: string
    studentId: string
    passwordUsed?: boolean
    setupCompleted?: boolean
    startedAt?: Date | string
    examStartedAt?: Date | string | null
    submittedAt?: Date | string | null
    answers?: string
    flagged?: string
    score?: number | null
    totalMarks?: number | null
    violationFlags?: JsonNullValueInput | InputJsonValue
    proctorDeductions?: number
    timePenaltySeconds?: number
    examCurrentIndex?: number
    endedByProctor?: boolean
    endReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    proctorFlags?: LiveProctorFlagUncheckedCreateNestedManyWithoutAttemptInput
  }

  export type LiveTestAttemptCreateOrConnectWithoutTestInput = {
    where: LiveTestAttemptWhereUniqueInput
    create: XOR<LiveTestAttemptCreateWithoutTestInput, LiveTestAttemptUncheckedCreateWithoutTestInput>
  }

  export type LiveTestAttemptCreateManyTestInputEnvelope = {
    data: LiveTestAttemptCreateManyTestInput | LiveTestAttemptCreateManyTestInput[]
    skipDuplicates?: boolean
  }

  export type LiveProctorFlagCreateWithoutTestInput = {
    id?: string
    note?: string | null
    createdAt?: Date | string
    student: StudentCreateNestedOneWithoutProctorFlagsInput
    attempt?: LiveTestAttemptCreateNestedOneWithoutProctorFlagsInput
    proctor: UserCreateNestedOneWithoutProctorFlagsInput
  }

  export type LiveProctorFlagUncheckedCreateWithoutTestInput = {
    id?: string
    studentId: string
    attemptId?: string | null
    proctorId: string
    note?: string | null
    createdAt?: Date | string
  }

  export type LiveProctorFlagCreateOrConnectWithoutTestInput = {
    where: LiveProctorFlagWhereUniqueInput
    create: XOR<LiveProctorFlagCreateWithoutTestInput, LiveProctorFlagUncheckedCreateWithoutTestInput>
  }

  export type LiveProctorFlagCreateManyTestInputEnvelope = {
    data: LiveProctorFlagCreateManyTestInput | LiveProctorFlagCreateManyTestInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutTestsInput = {
    update: XOR<UserUpdateWithoutTestsInput, UserUncheckedUpdateWithoutTestsInput>
    create: XOR<UserCreateWithoutTestsInput, UserUncheckedCreateWithoutTestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTestsInput, UserUncheckedUpdateWithoutTestsInput>
  }

  export type UserUpdateWithoutTestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    uniqueId?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    accountId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentsCreated?: StudentUpdateManyWithoutCreatedByNestedInput
    proctorFlags?: LiveProctorFlagUpdateManyWithoutProctorNestedInput
    sessions?: LoginSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    uniqueId?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    accountId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentsCreated?: StudentUncheckedUpdateManyWithoutCreatedByNestedInput
    proctorFlags?: LiveProctorFlagUncheckedUpdateManyWithoutProctorNestedInput
    sessions?: LoginSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type QuestionUpsertWithWhereUniqueWithoutTestInput = {
    where: QuestionWhereUniqueInput
    update: XOR<QuestionUpdateWithoutTestInput, QuestionUncheckedUpdateWithoutTestInput>
    create: XOR<QuestionCreateWithoutTestInput, QuestionUncheckedCreateWithoutTestInput>
  }

  export type QuestionUpdateWithWhereUniqueWithoutTestInput = {
    where: QuestionWhereUniqueInput
    data: XOR<QuestionUpdateWithoutTestInput, QuestionUncheckedUpdateWithoutTestInput>
  }

  export type QuestionUpdateManyWithWhereWithoutTestInput = {
    where: QuestionScalarWhereInput
    data: XOR<QuestionUpdateManyMutationInput, QuestionUncheckedUpdateManyWithoutTestInput>
  }

  export type QuestionScalarWhereInput = {
    AND?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
    OR?: QuestionScalarWhereInput[]
    NOT?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
    id?: StringFilter<"Question"> | string
    text?: StringFilter<"Question"> | string
    type?: EnumQuestionTypeFilter<"Question"> | $Enums.QuestionType
    options?: StringNullableFilter<"Question"> | string | null
    correctOption?: IntNullableFilter<"Question"> | number | null
    correctAnswer?: StringNullableFilter<"Question"> | string | null
    marks?: IntFilter<"Question"> | number
    explanation?: StringNullableFilter<"Question"> | string | null
    order?: IntFilter<"Question"> | number
    testId?: StringFilter<"Question"> | string
  }

  export type TestScoreUpsertWithWhereUniqueWithoutTestInput = {
    where: TestScoreWhereUniqueInput
    update: XOR<TestScoreUpdateWithoutTestInput, TestScoreUncheckedUpdateWithoutTestInput>
    create: XOR<TestScoreCreateWithoutTestInput, TestScoreUncheckedCreateWithoutTestInput>
  }

  export type TestScoreUpdateWithWhereUniqueWithoutTestInput = {
    where: TestScoreWhereUniqueInput
    data: XOR<TestScoreUpdateWithoutTestInput, TestScoreUncheckedUpdateWithoutTestInput>
  }

  export type TestScoreUpdateManyWithWhereWithoutTestInput = {
    where: TestScoreScalarWhereInput
    data: XOR<TestScoreUpdateManyMutationInput, TestScoreUncheckedUpdateManyWithoutTestInput>
  }

  export type LiveTestAttemptUpsertWithWhereUniqueWithoutTestInput = {
    where: LiveTestAttemptWhereUniqueInput
    update: XOR<LiveTestAttemptUpdateWithoutTestInput, LiveTestAttemptUncheckedUpdateWithoutTestInput>
    create: XOR<LiveTestAttemptCreateWithoutTestInput, LiveTestAttemptUncheckedCreateWithoutTestInput>
  }

  export type LiveTestAttemptUpdateWithWhereUniqueWithoutTestInput = {
    where: LiveTestAttemptWhereUniqueInput
    data: XOR<LiveTestAttemptUpdateWithoutTestInput, LiveTestAttemptUncheckedUpdateWithoutTestInput>
  }

  export type LiveTestAttemptUpdateManyWithWhereWithoutTestInput = {
    where: LiveTestAttemptScalarWhereInput
    data: XOR<LiveTestAttemptUpdateManyMutationInput, LiveTestAttemptUncheckedUpdateManyWithoutTestInput>
  }

  export type LiveProctorFlagUpsertWithWhereUniqueWithoutTestInput = {
    where: LiveProctorFlagWhereUniqueInput
    update: XOR<LiveProctorFlagUpdateWithoutTestInput, LiveProctorFlagUncheckedUpdateWithoutTestInput>
    create: XOR<LiveProctorFlagCreateWithoutTestInput, LiveProctorFlagUncheckedCreateWithoutTestInput>
  }

  export type LiveProctorFlagUpdateWithWhereUniqueWithoutTestInput = {
    where: LiveProctorFlagWhereUniqueInput
    data: XOR<LiveProctorFlagUpdateWithoutTestInput, LiveProctorFlagUncheckedUpdateWithoutTestInput>
  }

  export type LiveProctorFlagUpdateManyWithWhereWithoutTestInput = {
    where: LiveProctorFlagScalarWhereInput
    data: XOR<LiveProctorFlagUpdateManyMutationInput, LiveProctorFlagUncheckedUpdateManyWithoutTestInput>
  }

  export type TestCreateWithoutLiveAttemptsInput = {
    id?: string
    name: string
    description?: string | null
    subjectName?: string
    totalMarks?: number | null
    numberOfQuestions?: number | null
    difficulty?: $Enums.Difficulty
    slug: string
    settings?: string
    visibility?: boolean
    isScheduled?: boolean
    startTime?: Date | string | null
    duration?: number | null
    allowRetake?: boolean
    showResults?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutTestsInput
    questions?: QuestionCreateNestedManyWithoutTestInput
    testScores?: TestScoreCreateNestedManyWithoutTestInput
    proctorFlags?: LiveProctorFlagCreateNestedManyWithoutTestInput
  }

  export type TestUncheckedCreateWithoutLiveAttemptsInput = {
    id?: string
    name: string
    description?: string | null
    subjectName?: string
    totalMarks?: number | null
    numberOfQuestions?: number | null
    difficulty?: $Enums.Difficulty
    slug: string
    settings?: string
    visibility?: boolean
    isScheduled?: boolean
    startTime?: Date | string | null
    duration?: number | null
    allowRetake?: boolean
    showResults?: boolean
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionUncheckedCreateNestedManyWithoutTestInput
    testScores?: TestScoreUncheckedCreateNestedManyWithoutTestInput
    proctorFlags?: LiveProctorFlagUncheckedCreateNestedManyWithoutTestInput
  }

  export type TestCreateOrConnectWithoutLiveAttemptsInput = {
    where: TestWhereUniqueInput
    create: XOR<TestCreateWithoutLiveAttemptsInput, TestUncheckedCreateWithoutLiveAttemptsInput>
  }

  export type StudentCreateWithoutLiveAttemptsInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutStudentsCreatedInput
    testScores?: TestScoreCreateNestedManyWithoutStudentInput
    proctorFlags?: LiveProctorFlagCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutLiveAttemptsInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    testScores?: TestScoreUncheckedCreateNestedManyWithoutStudentInput
    proctorFlags?: LiveProctorFlagUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutLiveAttemptsInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutLiveAttemptsInput, StudentUncheckedCreateWithoutLiveAttemptsInput>
  }

  export type LiveProctorFlagCreateWithoutAttemptInput = {
    id?: string
    note?: string | null
    createdAt?: Date | string
    test: TestCreateNestedOneWithoutProctorFlagsInput
    student: StudentCreateNestedOneWithoutProctorFlagsInput
    proctor: UserCreateNestedOneWithoutProctorFlagsInput
  }

  export type LiveProctorFlagUncheckedCreateWithoutAttemptInput = {
    id?: string
    testId: string
    studentId: string
    proctorId: string
    note?: string | null
    createdAt?: Date | string
  }

  export type LiveProctorFlagCreateOrConnectWithoutAttemptInput = {
    where: LiveProctorFlagWhereUniqueInput
    create: XOR<LiveProctorFlagCreateWithoutAttemptInput, LiveProctorFlagUncheckedCreateWithoutAttemptInput>
  }

  export type LiveProctorFlagCreateManyAttemptInputEnvelope = {
    data: LiveProctorFlagCreateManyAttemptInput | LiveProctorFlagCreateManyAttemptInput[]
    skipDuplicates?: boolean
  }

  export type TestUpsertWithoutLiveAttemptsInput = {
    update: XOR<TestUpdateWithoutLiveAttemptsInput, TestUncheckedUpdateWithoutLiveAttemptsInput>
    create: XOR<TestCreateWithoutLiveAttemptsInput, TestUncheckedCreateWithoutLiveAttemptsInput>
    where?: TestWhereInput
  }

  export type TestUpdateToOneWithWhereWithoutLiveAttemptsInput = {
    where?: TestWhereInput
    data: XOR<TestUpdateWithoutLiveAttemptsInput, TestUncheckedUpdateWithoutLiveAttemptsInput>
  }

  export type TestUpdateWithoutLiveAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    subjectName?: StringFieldUpdateOperationsInput | string
    totalMarks?: NullableIntFieldUpdateOperationsInput | number | null
    numberOfQuestions?: NullableIntFieldUpdateOperationsInput | number | null
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    slug?: StringFieldUpdateOperationsInput | string
    settings?: StringFieldUpdateOperationsInput | string
    visibility?: BoolFieldUpdateOperationsInput | boolean
    isScheduled?: BoolFieldUpdateOperationsInput | boolean
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    allowRetake?: BoolFieldUpdateOperationsInput | boolean
    showResults?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutTestsNestedInput
    questions?: QuestionUpdateManyWithoutTestNestedInput
    testScores?: TestScoreUpdateManyWithoutTestNestedInput
    proctorFlags?: LiveProctorFlagUpdateManyWithoutTestNestedInput
  }

  export type TestUncheckedUpdateWithoutLiveAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    subjectName?: StringFieldUpdateOperationsInput | string
    totalMarks?: NullableIntFieldUpdateOperationsInput | number | null
    numberOfQuestions?: NullableIntFieldUpdateOperationsInput | number | null
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    slug?: StringFieldUpdateOperationsInput | string
    settings?: StringFieldUpdateOperationsInput | string
    visibility?: BoolFieldUpdateOperationsInput | boolean
    isScheduled?: BoolFieldUpdateOperationsInput | boolean
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    allowRetake?: BoolFieldUpdateOperationsInput | boolean
    showResults?: BoolFieldUpdateOperationsInput | boolean
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUncheckedUpdateManyWithoutTestNestedInput
    testScores?: TestScoreUncheckedUpdateManyWithoutTestNestedInput
    proctorFlags?: LiveProctorFlagUncheckedUpdateManyWithoutTestNestedInput
  }

  export type StudentUpsertWithoutLiveAttemptsInput = {
    update: XOR<StudentUpdateWithoutLiveAttemptsInput, StudentUncheckedUpdateWithoutLiveAttemptsInput>
    create: XOR<StudentCreateWithoutLiveAttemptsInput, StudentUncheckedCreateWithoutLiveAttemptsInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutLiveAttemptsInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutLiveAttemptsInput, StudentUncheckedUpdateWithoutLiveAttemptsInput>
  }

  export type StudentUpdateWithoutLiveAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutStudentsCreatedNestedInput
    testScores?: TestScoreUpdateManyWithoutStudentNestedInput
    proctorFlags?: LiveProctorFlagUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutLiveAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testScores?: TestScoreUncheckedUpdateManyWithoutStudentNestedInput
    proctorFlags?: LiveProctorFlagUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type LiveProctorFlagUpsertWithWhereUniqueWithoutAttemptInput = {
    where: LiveProctorFlagWhereUniqueInput
    update: XOR<LiveProctorFlagUpdateWithoutAttemptInput, LiveProctorFlagUncheckedUpdateWithoutAttemptInput>
    create: XOR<LiveProctorFlagCreateWithoutAttemptInput, LiveProctorFlagUncheckedCreateWithoutAttemptInput>
  }

  export type LiveProctorFlagUpdateWithWhereUniqueWithoutAttemptInput = {
    where: LiveProctorFlagWhereUniqueInput
    data: XOR<LiveProctorFlagUpdateWithoutAttemptInput, LiveProctorFlagUncheckedUpdateWithoutAttemptInput>
  }

  export type LiveProctorFlagUpdateManyWithWhereWithoutAttemptInput = {
    where: LiveProctorFlagScalarWhereInput
    data: XOR<LiveProctorFlagUpdateManyMutationInput, LiveProctorFlagUncheckedUpdateManyWithoutAttemptInput>
  }

  export type TestCreateWithoutProctorFlagsInput = {
    id?: string
    name: string
    description?: string | null
    subjectName?: string
    totalMarks?: number | null
    numberOfQuestions?: number | null
    difficulty?: $Enums.Difficulty
    slug: string
    settings?: string
    visibility?: boolean
    isScheduled?: boolean
    startTime?: Date | string | null
    duration?: number | null
    allowRetake?: boolean
    showResults?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutTestsInput
    questions?: QuestionCreateNestedManyWithoutTestInput
    testScores?: TestScoreCreateNestedManyWithoutTestInput
    liveAttempts?: LiveTestAttemptCreateNestedManyWithoutTestInput
  }

  export type TestUncheckedCreateWithoutProctorFlagsInput = {
    id?: string
    name: string
    description?: string | null
    subjectName?: string
    totalMarks?: number | null
    numberOfQuestions?: number | null
    difficulty?: $Enums.Difficulty
    slug: string
    settings?: string
    visibility?: boolean
    isScheduled?: boolean
    startTime?: Date | string | null
    duration?: number | null
    allowRetake?: boolean
    showResults?: boolean
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionUncheckedCreateNestedManyWithoutTestInput
    testScores?: TestScoreUncheckedCreateNestedManyWithoutTestInput
    liveAttempts?: LiveTestAttemptUncheckedCreateNestedManyWithoutTestInput
  }

  export type TestCreateOrConnectWithoutProctorFlagsInput = {
    where: TestWhereUniqueInput
    create: XOR<TestCreateWithoutProctorFlagsInput, TestUncheckedCreateWithoutProctorFlagsInput>
  }

  export type StudentCreateWithoutProctorFlagsInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutStudentsCreatedInput
    testScores?: TestScoreCreateNestedManyWithoutStudentInput
    liveAttempts?: LiveTestAttemptCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutProctorFlagsInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    testScores?: TestScoreUncheckedCreateNestedManyWithoutStudentInput
    liveAttempts?: LiveTestAttemptUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutProctorFlagsInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutProctorFlagsInput, StudentUncheckedCreateWithoutProctorFlagsInput>
  }

  export type LiveTestAttemptCreateWithoutProctorFlagsInput = {
    id?: string
    passwordUsed?: boolean
    setupCompleted?: boolean
    startedAt?: Date | string
    examStartedAt?: Date | string | null
    submittedAt?: Date | string | null
    answers?: string
    flagged?: string
    score?: number | null
    totalMarks?: number | null
    violationFlags?: JsonNullValueInput | InputJsonValue
    proctorDeductions?: number
    timePenaltySeconds?: number
    examCurrentIndex?: number
    endedByProctor?: boolean
    endReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    test: TestCreateNestedOneWithoutLiveAttemptsInput
    student: StudentCreateNestedOneWithoutLiveAttemptsInput
  }

  export type LiveTestAttemptUncheckedCreateWithoutProctorFlagsInput = {
    id?: string
    testId: string
    studentId: string
    passwordUsed?: boolean
    setupCompleted?: boolean
    startedAt?: Date | string
    examStartedAt?: Date | string | null
    submittedAt?: Date | string | null
    answers?: string
    flagged?: string
    score?: number | null
    totalMarks?: number | null
    violationFlags?: JsonNullValueInput | InputJsonValue
    proctorDeductions?: number
    timePenaltySeconds?: number
    examCurrentIndex?: number
    endedByProctor?: boolean
    endReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LiveTestAttemptCreateOrConnectWithoutProctorFlagsInput = {
    where: LiveTestAttemptWhereUniqueInput
    create: XOR<LiveTestAttemptCreateWithoutProctorFlagsInput, LiveTestAttemptUncheckedCreateWithoutProctorFlagsInput>
  }

  export type UserCreateWithoutProctorFlagsInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    username?: string | null
    passwordHash?: string | null
    uniqueId?: string | null
    image?: string | null
    gender?: $Enums.Gender
    phone?: string | null
    city?: string | null
    accountId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tests?: TestCreateNestedManyWithoutCreatedByInput
    studentsCreated?: StudentCreateNestedManyWithoutCreatedByInput
    sessions?: LoginSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProctorFlagsInput = {
    id?: string
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    username?: string | null
    passwordHash?: string | null
    uniqueId?: string | null
    image?: string | null
    gender?: $Enums.Gender
    phone?: string | null
    city?: string | null
    accountId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tests?: TestUncheckedCreateNestedManyWithoutCreatedByInput
    studentsCreated?: StudentUncheckedCreateNestedManyWithoutCreatedByInput
    sessions?: LoginSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProctorFlagsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProctorFlagsInput, UserUncheckedCreateWithoutProctorFlagsInput>
  }

  export type TestUpsertWithoutProctorFlagsInput = {
    update: XOR<TestUpdateWithoutProctorFlagsInput, TestUncheckedUpdateWithoutProctorFlagsInput>
    create: XOR<TestCreateWithoutProctorFlagsInput, TestUncheckedCreateWithoutProctorFlagsInput>
    where?: TestWhereInput
  }

  export type TestUpdateToOneWithWhereWithoutProctorFlagsInput = {
    where?: TestWhereInput
    data: XOR<TestUpdateWithoutProctorFlagsInput, TestUncheckedUpdateWithoutProctorFlagsInput>
  }

  export type TestUpdateWithoutProctorFlagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    subjectName?: StringFieldUpdateOperationsInput | string
    totalMarks?: NullableIntFieldUpdateOperationsInput | number | null
    numberOfQuestions?: NullableIntFieldUpdateOperationsInput | number | null
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    slug?: StringFieldUpdateOperationsInput | string
    settings?: StringFieldUpdateOperationsInput | string
    visibility?: BoolFieldUpdateOperationsInput | boolean
    isScheduled?: BoolFieldUpdateOperationsInput | boolean
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    allowRetake?: BoolFieldUpdateOperationsInput | boolean
    showResults?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutTestsNestedInput
    questions?: QuestionUpdateManyWithoutTestNestedInput
    testScores?: TestScoreUpdateManyWithoutTestNestedInput
    liveAttempts?: LiveTestAttemptUpdateManyWithoutTestNestedInput
  }

  export type TestUncheckedUpdateWithoutProctorFlagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    subjectName?: StringFieldUpdateOperationsInput | string
    totalMarks?: NullableIntFieldUpdateOperationsInput | number | null
    numberOfQuestions?: NullableIntFieldUpdateOperationsInput | number | null
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    slug?: StringFieldUpdateOperationsInput | string
    settings?: StringFieldUpdateOperationsInput | string
    visibility?: BoolFieldUpdateOperationsInput | boolean
    isScheduled?: BoolFieldUpdateOperationsInput | boolean
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    allowRetake?: BoolFieldUpdateOperationsInput | boolean
    showResults?: BoolFieldUpdateOperationsInput | boolean
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUncheckedUpdateManyWithoutTestNestedInput
    testScores?: TestScoreUncheckedUpdateManyWithoutTestNestedInput
    liveAttempts?: LiveTestAttemptUncheckedUpdateManyWithoutTestNestedInput
  }

  export type StudentUpsertWithoutProctorFlagsInput = {
    update: XOR<StudentUpdateWithoutProctorFlagsInput, StudentUncheckedUpdateWithoutProctorFlagsInput>
    create: XOR<StudentCreateWithoutProctorFlagsInput, StudentUncheckedCreateWithoutProctorFlagsInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutProctorFlagsInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutProctorFlagsInput, StudentUncheckedUpdateWithoutProctorFlagsInput>
  }

  export type StudentUpdateWithoutProctorFlagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutStudentsCreatedNestedInput
    testScores?: TestScoreUpdateManyWithoutStudentNestedInput
    liveAttempts?: LiveTestAttemptUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutProctorFlagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testScores?: TestScoreUncheckedUpdateManyWithoutStudentNestedInput
    liveAttempts?: LiveTestAttemptUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type LiveTestAttemptUpsertWithoutProctorFlagsInput = {
    update: XOR<LiveTestAttemptUpdateWithoutProctorFlagsInput, LiveTestAttemptUncheckedUpdateWithoutProctorFlagsInput>
    create: XOR<LiveTestAttemptCreateWithoutProctorFlagsInput, LiveTestAttemptUncheckedCreateWithoutProctorFlagsInput>
    where?: LiveTestAttemptWhereInput
  }

  export type LiveTestAttemptUpdateToOneWithWhereWithoutProctorFlagsInput = {
    where?: LiveTestAttemptWhereInput
    data: XOR<LiveTestAttemptUpdateWithoutProctorFlagsInput, LiveTestAttemptUncheckedUpdateWithoutProctorFlagsInput>
  }

  export type LiveTestAttemptUpdateWithoutProctorFlagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    passwordUsed?: BoolFieldUpdateOperationsInput | boolean
    setupCompleted?: BoolFieldUpdateOperationsInput | boolean
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    examStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: StringFieldUpdateOperationsInput | string
    flagged?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    totalMarks?: NullableIntFieldUpdateOperationsInput | number | null
    violationFlags?: JsonNullValueInput | InputJsonValue
    proctorDeductions?: IntFieldUpdateOperationsInput | number
    timePenaltySeconds?: IntFieldUpdateOperationsInput | number
    examCurrentIndex?: IntFieldUpdateOperationsInput | number
    endedByProctor?: BoolFieldUpdateOperationsInput | boolean
    endReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    test?: TestUpdateOneRequiredWithoutLiveAttemptsNestedInput
    student?: StudentUpdateOneRequiredWithoutLiveAttemptsNestedInput
  }

  export type LiveTestAttemptUncheckedUpdateWithoutProctorFlagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    passwordUsed?: BoolFieldUpdateOperationsInput | boolean
    setupCompleted?: BoolFieldUpdateOperationsInput | boolean
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    examStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: StringFieldUpdateOperationsInput | string
    flagged?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    totalMarks?: NullableIntFieldUpdateOperationsInput | number | null
    violationFlags?: JsonNullValueInput | InputJsonValue
    proctorDeductions?: IntFieldUpdateOperationsInput | number
    timePenaltySeconds?: IntFieldUpdateOperationsInput | number
    examCurrentIndex?: IntFieldUpdateOperationsInput | number
    endedByProctor?: BoolFieldUpdateOperationsInput | boolean
    endReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutProctorFlagsInput = {
    update: XOR<UserUpdateWithoutProctorFlagsInput, UserUncheckedUpdateWithoutProctorFlagsInput>
    create: XOR<UserCreateWithoutProctorFlagsInput, UserUncheckedCreateWithoutProctorFlagsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProctorFlagsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProctorFlagsInput, UserUncheckedUpdateWithoutProctorFlagsInput>
  }

  export type UserUpdateWithoutProctorFlagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    uniqueId?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    accountId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tests?: TestUpdateManyWithoutCreatedByNestedInput
    studentsCreated?: StudentUpdateManyWithoutCreatedByNestedInput
    sessions?: LoginSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProctorFlagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    uniqueId?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    accountId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tests?: TestUncheckedUpdateManyWithoutCreatedByNestedInput
    studentsCreated?: StudentUncheckedUpdateManyWithoutCreatedByNestedInput
    sessions?: LoginSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TestCreateWithoutQuestionsInput = {
    id?: string
    name: string
    description?: string | null
    subjectName?: string
    totalMarks?: number | null
    numberOfQuestions?: number | null
    difficulty?: $Enums.Difficulty
    slug: string
    settings?: string
    visibility?: boolean
    isScheduled?: boolean
    startTime?: Date | string | null
    duration?: number | null
    allowRetake?: boolean
    showResults?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutTestsInput
    testScores?: TestScoreCreateNestedManyWithoutTestInput
    liveAttempts?: LiveTestAttemptCreateNestedManyWithoutTestInput
    proctorFlags?: LiveProctorFlagCreateNestedManyWithoutTestInput
  }

  export type TestUncheckedCreateWithoutQuestionsInput = {
    id?: string
    name: string
    description?: string | null
    subjectName?: string
    totalMarks?: number | null
    numberOfQuestions?: number | null
    difficulty?: $Enums.Difficulty
    slug: string
    settings?: string
    visibility?: boolean
    isScheduled?: boolean
    startTime?: Date | string | null
    duration?: number | null
    allowRetake?: boolean
    showResults?: boolean
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    testScores?: TestScoreUncheckedCreateNestedManyWithoutTestInput
    liveAttempts?: LiveTestAttemptUncheckedCreateNestedManyWithoutTestInput
    proctorFlags?: LiveProctorFlagUncheckedCreateNestedManyWithoutTestInput
  }

  export type TestCreateOrConnectWithoutQuestionsInput = {
    where: TestWhereUniqueInput
    create: XOR<TestCreateWithoutQuestionsInput, TestUncheckedCreateWithoutQuestionsInput>
  }

  export type TestUpsertWithoutQuestionsInput = {
    update: XOR<TestUpdateWithoutQuestionsInput, TestUncheckedUpdateWithoutQuestionsInput>
    create: XOR<TestCreateWithoutQuestionsInput, TestUncheckedCreateWithoutQuestionsInput>
    where?: TestWhereInput
  }

  export type TestUpdateToOneWithWhereWithoutQuestionsInput = {
    where?: TestWhereInput
    data: XOR<TestUpdateWithoutQuestionsInput, TestUncheckedUpdateWithoutQuestionsInput>
  }

  export type TestUpdateWithoutQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    subjectName?: StringFieldUpdateOperationsInput | string
    totalMarks?: NullableIntFieldUpdateOperationsInput | number | null
    numberOfQuestions?: NullableIntFieldUpdateOperationsInput | number | null
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    slug?: StringFieldUpdateOperationsInput | string
    settings?: StringFieldUpdateOperationsInput | string
    visibility?: BoolFieldUpdateOperationsInput | boolean
    isScheduled?: BoolFieldUpdateOperationsInput | boolean
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    allowRetake?: BoolFieldUpdateOperationsInput | boolean
    showResults?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutTestsNestedInput
    testScores?: TestScoreUpdateManyWithoutTestNestedInput
    liveAttempts?: LiveTestAttemptUpdateManyWithoutTestNestedInput
    proctorFlags?: LiveProctorFlagUpdateManyWithoutTestNestedInput
  }

  export type TestUncheckedUpdateWithoutQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    subjectName?: StringFieldUpdateOperationsInput | string
    totalMarks?: NullableIntFieldUpdateOperationsInput | number | null
    numberOfQuestions?: NullableIntFieldUpdateOperationsInput | number | null
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    slug?: StringFieldUpdateOperationsInput | string
    settings?: StringFieldUpdateOperationsInput | string
    visibility?: BoolFieldUpdateOperationsInput | boolean
    isScheduled?: BoolFieldUpdateOperationsInput | boolean
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    allowRetake?: BoolFieldUpdateOperationsInput | boolean
    showResults?: BoolFieldUpdateOperationsInput | boolean
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testScores?: TestScoreUncheckedUpdateManyWithoutTestNestedInput
    liveAttempts?: LiveTestAttemptUncheckedUpdateManyWithoutTestNestedInput
    proctorFlags?: LiveProctorFlagUncheckedUpdateManyWithoutTestNestedInput
  }

  export type StudentCreateWithoutTestScoresInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutStudentsCreatedInput
    liveAttempts?: LiveTestAttemptCreateNestedManyWithoutStudentInput
    proctorFlags?: LiveProctorFlagCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutTestScoresInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    liveAttempts?: LiveTestAttemptUncheckedCreateNestedManyWithoutStudentInput
    proctorFlags?: LiveProctorFlagUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutTestScoresInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutTestScoresInput, StudentUncheckedCreateWithoutTestScoresInput>
  }

  export type TestCreateWithoutTestScoresInput = {
    id?: string
    name: string
    description?: string | null
    subjectName?: string
    totalMarks?: number | null
    numberOfQuestions?: number | null
    difficulty?: $Enums.Difficulty
    slug: string
    settings?: string
    visibility?: boolean
    isScheduled?: boolean
    startTime?: Date | string | null
    duration?: number | null
    allowRetake?: boolean
    showResults?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutTestsInput
    questions?: QuestionCreateNestedManyWithoutTestInput
    liveAttempts?: LiveTestAttemptCreateNestedManyWithoutTestInput
    proctorFlags?: LiveProctorFlagCreateNestedManyWithoutTestInput
  }

  export type TestUncheckedCreateWithoutTestScoresInput = {
    id?: string
    name: string
    description?: string | null
    subjectName?: string
    totalMarks?: number | null
    numberOfQuestions?: number | null
    difficulty?: $Enums.Difficulty
    slug: string
    settings?: string
    visibility?: boolean
    isScheduled?: boolean
    startTime?: Date | string | null
    duration?: number | null
    allowRetake?: boolean
    showResults?: boolean
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionUncheckedCreateNestedManyWithoutTestInput
    liveAttempts?: LiveTestAttemptUncheckedCreateNestedManyWithoutTestInput
    proctorFlags?: LiveProctorFlagUncheckedCreateNestedManyWithoutTestInput
  }

  export type TestCreateOrConnectWithoutTestScoresInput = {
    where: TestWhereUniqueInput
    create: XOR<TestCreateWithoutTestScoresInput, TestUncheckedCreateWithoutTestScoresInput>
  }

  export type StudentUpsertWithoutTestScoresInput = {
    update: XOR<StudentUpdateWithoutTestScoresInput, StudentUncheckedUpdateWithoutTestScoresInput>
    create: XOR<StudentCreateWithoutTestScoresInput, StudentUncheckedCreateWithoutTestScoresInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutTestScoresInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutTestScoresInput, StudentUncheckedUpdateWithoutTestScoresInput>
  }

  export type StudentUpdateWithoutTestScoresInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutStudentsCreatedNestedInput
    liveAttempts?: LiveTestAttemptUpdateManyWithoutStudentNestedInput
    proctorFlags?: LiveProctorFlagUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutTestScoresInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    liveAttempts?: LiveTestAttemptUncheckedUpdateManyWithoutStudentNestedInput
    proctorFlags?: LiveProctorFlagUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type TestUpsertWithoutTestScoresInput = {
    update: XOR<TestUpdateWithoutTestScoresInput, TestUncheckedUpdateWithoutTestScoresInput>
    create: XOR<TestCreateWithoutTestScoresInput, TestUncheckedCreateWithoutTestScoresInput>
    where?: TestWhereInput
  }

  export type TestUpdateToOneWithWhereWithoutTestScoresInput = {
    where?: TestWhereInput
    data: XOR<TestUpdateWithoutTestScoresInput, TestUncheckedUpdateWithoutTestScoresInput>
  }

  export type TestUpdateWithoutTestScoresInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    subjectName?: StringFieldUpdateOperationsInput | string
    totalMarks?: NullableIntFieldUpdateOperationsInput | number | null
    numberOfQuestions?: NullableIntFieldUpdateOperationsInput | number | null
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    slug?: StringFieldUpdateOperationsInput | string
    settings?: StringFieldUpdateOperationsInput | string
    visibility?: BoolFieldUpdateOperationsInput | boolean
    isScheduled?: BoolFieldUpdateOperationsInput | boolean
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    allowRetake?: BoolFieldUpdateOperationsInput | boolean
    showResults?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutTestsNestedInput
    questions?: QuestionUpdateManyWithoutTestNestedInput
    liveAttempts?: LiveTestAttemptUpdateManyWithoutTestNestedInput
    proctorFlags?: LiveProctorFlagUpdateManyWithoutTestNestedInput
  }

  export type TestUncheckedUpdateWithoutTestScoresInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    subjectName?: StringFieldUpdateOperationsInput | string
    totalMarks?: NullableIntFieldUpdateOperationsInput | number | null
    numberOfQuestions?: NullableIntFieldUpdateOperationsInput | number | null
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    slug?: StringFieldUpdateOperationsInput | string
    settings?: StringFieldUpdateOperationsInput | string
    visibility?: BoolFieldUpdateOperationsInput | boolean
    isScheduled?: BoolFieldUpdateOperationsInput | boolean
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    allowRetake?: BoolFieldUpdateOperationsInput | boolean
    showResults?: BoolFieldUpdateOperationsInput | boolean
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUncheckedUpdateManyWithoutTestNestedInput
    liveAttempts?: LiveTestAttemptUncheckedUpdateManyWithoutTestNestedInput
    proctorFlags?: LiveProctorFlagUncheckedUpdateManyWithoutTestNestedInput
  }

  export type TestCreateManyCreatedByInput = {
    id?: string
    name: string
    description?: string | null
    subjectName?: string
    totalMarks?: number | null
    numberOfQuestions?: number | null
    difficulty?: $Enums.Difficulty
    slug: string
    settings?: string
    visibility?: boolean
    isScheduled?: boolean
    startTime?: Date | string | null
    duration?: number | null
    allowRetake?: boolean
    showResults?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentCreateManyCreatedByInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LiveProctorFlagCreateManyProctorInput = {
    id?: string
    testId: string
    studentId: string
    attemptId?: string | null
    note?: string | null
    createdAt?: Date | string
  }

  export type LoginSessionCreateManyUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type TestUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    subjectName?: StringFieldUpdateOperationsInput | string
    totalMarks?: NullableIntFieldUpdateOperationsInput | number | null
    numberOfQuestions?: NullableIntFieldUpdateOperationsInput | number | null
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    slug?: StringFieldUpdateOperationsInput | string
    settings?: StringFieldUpdateOperationsInput | string
    visibility?: BoolFieldUpdateOperationsInput | boolean
    isScheduled?: BoolFieldUpdateOperationsInput | boolean
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    allowRetake?: BoolFieldUpdateOperationsInput | boolean
    showResults?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUpdateManyWithoutTestNestedInput
    testScores?: TestScoreUpdateManyWithoutTestNestedInput
    liveAttempts?: LiveTestAttemptUpdateManyWithoutTestNestedInput
    proctorFlags?: LiveProctorFlagUpdateManyWithoutTestNestedInput
  }

  export type TestUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    subjectName?: StringFieldUpdateOperationsInput | string
    totalMarks?: NullableIntFieldUpdateOperationsInput | number | null
    numberOfQuestions?: NullableIntFieldUpdateOperationsInput | number | null
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    slug?: StringFieldUpdateOperationsInput | string
    settings?: StringFieldUpdateOperationsInput | string
    visibility?: BoolFieldUpdateOperationsInput | boolean
    isScheduled?: BoolFieldUpdateOperationsInput | boolean
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    allowRetake?: BoolFieldUpdateOperationsInput | boolean
    showResults?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUncheckedUpdateManyWithoutTestNestedInput
    testScores?: TestScoreUncheckedUpdateManyWithoutTestNestedInput
    liveAttempts?: LiveTestAttemptUncheckedUpdateManyWithoutTestNestedInput
    proctorFlags?: LiveProctorFlagUncheckedUpdateManyWithoutTestNestedInput
  }

  export type TestUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    subjectName?: StringFieldUpdateOperationsInput | string
    totalMarks?: NullableIntFieldUpdateOperationsInput | number | null
    numberOfQuestions?: NullableIntFieldUpdateOperationsInput | number | null
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    slug?: StringFieldUpdateOperationsInput | string
    settings?: StringFieldUpdateOperationsInput | string
    visibility?: BoolFieldUpdateOperationsInput | boolean
    isScheduled?: BoolFieldUpdateOperationsInput | boolean
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    allowRetake?: BoolFieldUpdateOperationsInput | boolean
    showResults?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testScores?: TestScoreUpdateManyWithoutStudentNestedInput
    liveAttempts?: LiveTestAttemptUpdateManyWithoutStudentNestedInput
    proctorFlags?: LiveProctorFlagUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testScores?: TestScoreUncheckedUpdateManyWithoutStudentNestedInput
    liveAttempts?: LiveTestAttemptUncheckedUpdateManyWithoutStudentNestedInput
    proctorFlags?: LiveProctorFlagUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LiveProctorFlagUpdateWithoutProctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    test?: TestUpdateOneRequiredWithoutProctorFlagsNestedInput
    student?: StudentUpdateOneRequiredWithoutProctorFlagsNestedInput
    attempt?: LiveTestAttemptUpdateOneWithoutProctorFlagsNestedInput
  }

  export type LiveProctorFlagUncheckedUpdateWithoutProctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    attemptId?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LiveProctorFlagUncheckedUpdateManyWithoutProctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    attemptId?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoginSessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoginSessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoginSessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestScoreCreateManyStudentInput = {
    id?: string
    testId: string
    score: number
    totalMarks: number
    passed?: boolean | null
    remarks?: string | null
    gradedAt?: Date | string | null
    answers?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LiveTestAttemptCreateManyStudentInput = {
    id?: string
    testId: string
    passwordUsed?: boolean
    setupCompleted?: boolean
    startedAt?: Date | string
    examStartedAt?: Date | string | null
    submittedAt?: Date | string | null
    answers?: string
    flagged?: string
    score?: number | null
    totalMarks?: number | null
    violationFlags?: JsonNullValueInput | InputJsonValue
    proctorDeductions?: number
    timePenaltySeconds?: number
    examCurrentIndex?: number
    endedByProctor?: boolean
    endReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LiveProctorFlagCreateManyStudentInput = {
    id?: string
    testId: string
    attemptId?: string | null
    proctorId: string
    note?: string | null
    createdAt?: Date | string
  }

  export type TestScoreUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    totalMarks?: IntFieldUpdateOperationsInput | number
    passed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    gradedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    test?: TestUpdateOneRequiredWithoutTestScoresNestedInput
  }

  export type TestScoreUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    totalMarks?: IntFieldUpdateOperationsInput | number
    passed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    gradedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestScoreUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    totalMarks?: IntFieldUpdateOperationsInput | number
    passed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    gradedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LiveTestAttemptUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    passwordUsed?: BoolFieldUpdateOperationsInput | boolean
    setupCompleted?: BoolFieldUpdateOperationsInput | boolean
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    examStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: StringFieldUpdateOperationsInput | string
    flagged?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    totalMarks?: NullableIntFieldUpdateOperationsInput | number | null
    violationFlags?: JsonNullValueInput | InputJsonValue
    proctorDeductions?: IntFieldUpdateOperationsInput | number
    timePenaltySeconds?: IntFieldUpdateOperationsInput | number
    examCurrentIndex?: IntFieldUpdateOperationsInput | number
    endedByProctor?: BoolFieldUpdateOperationsInput | boolean
    endReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    test?: TestUpdateOneRequiredWithoutLiveAttemptsNestedInput
    proctorFlags?: LiveProctorFlagUpdateManyWithoutAttemptNestedInput
  }

  export type LiveTestAttemptUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    passwordUsed?: BoolFieldUpdateOperationsInput | boolean
    setupCompleted?: BoolFieldUpdateOperationsInput | boolean
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    examStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: StringFieldUpdateOperationsInput | string
    flagged?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    totalMarks?: NullableIntFieldUpdateOperationsInput | number | null
    violationFlags?: JsonNullValueInput | InputJsonValue
    proctorDeductions?: IntFieldUpdateOperationsInput | number
    timePenaltySeconds?: IntFieldUpdateOperationsInput | number
    examCurrentIndex?: IntFieldUpdateOperationsInput | number
    endedByProctor?: BoolFieldUpdateOperationsInput | boolean
    endReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proctorFlags?: LiveProctorFlagUncheckedUpdateManyWithoutAttemptNestedInput
  }

  export type LiveTestAttemptUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    passwordUsed?: BoolFieldUpdateOperationsInput | boolean
    setupCompleted?: BoolFieldUpdateOperationsInput | boolean
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    examStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: StringFieldUpdateOperationsInput | string
    flagged?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    totalMarks?: NullableIntFieldUpdateOperationsInput | number | null
    violationFlags?: JsonNullValueInput | InputJsonValue
    proctorDeductions?: IntFieldUpdateOperationsInput | number
    timePenaltySeconds?: IntFieldUpdateOperationsInput | number
    examCurrentIndex?: IntFieldUpdateOperationsInput | number
    endedByProctor?: BoolFieldUpdateOperationsInput | boolean
    endReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LiveProctorFlagUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    test?: TestUpdateOneRequiredWithoutProctorFlagsNestedInput
    attempt?: LiveTestAttemptUpdateOneWithoutProctorFlagsNestedInput
    proctor?: UserUpdateOneRequiredWithoutProctorFlagsNestedInput
  }

  export type LiveProctorFlagUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    attemptId?: NullableStringFieldUpdateOperationsInput | string | null
    proctorId?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LiveProctorFlagUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    attemptId?: NullableStringFieldUpdateOperationsInput | string | null
    proctorId?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionCreateManyTestInput = {
    id?: string
    text: string
    type: $Enums.QuestionType
    options?: string | null
    correctOption?: number | null
    correctAnswer?: string | null
    marks: number
    explanation?: string | null
    order?: number
  }

  export type TestScoreCreateManyTestInput = {
    id?: string
    studentId: string
    score: number
    totalMarks: number
    passed?: boolean | null
    remarks?: string | null
    gradedAt?: Date | string | null
    answers?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LiveTestAttemptCreateManyTestInput = {
    id?: string
    studentId: string
    passwordUsed?: boolean
    setupCompleted?: boolean
    startedAt?: Date | string
    examStartedAt?: Date | string | null
    submittedAt?: Date | string | null
    answers?: string
    flagged?: string
    score?: number | null
    totalMarks?: number | null
    violationFlags?: JsonNullValueInput | InputJsonValue
    proctorDeductions?: number
    timePenaltySeconds?: number
    examCurrentIndex?: number
    endedByProctor?: boolean
    endReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LiveProctorFlagCreateManyTestInput = {
    id?: string
    studentId: string
    attemptId?: string | null
    proctorId: string
    note?: string | null
    createdAt?: Date | string
  }

  export type QuestionUpdateWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    options?: NullableStringFieldUpdateOperationsInput | string | null
    correctOption?: NullableIntFieldUpdateOperationsInput | number | null
    correctAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    marks?: IntFieldUpdateOperationsInput | number
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
  }

  export type QuestionUncheckedUpdateWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    options?: NullableStringFieldUpdateOperationsInput | string | null
    correctOption?: NullableIntFieldUpdateOperationsInput | number | null
    correctAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    marks?: IntFieldUpdateOperationsInput | number
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
  }

  export type QuestionUncheckedUpdateManyWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    options?: NullableStringFieldUpdateOperationsInput | string | null
    correctOption?: NullableIntFieldUpdateOperationsInput | number | null
    correctAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    marks?: IntFieldUpdateOperationsInput | number
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
  }

  export type TestScoreUpdateWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    totalMarks?: IntFieldUpdateOperationsInput | number
    passed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    gradedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutTestScoresNestedInput
  }

  export type TestScoreUncheckedUpdateWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    totalMarks?: IntFieldUpdateOperationsInput | number
    passed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    gradedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestScoreUncheckedUpdateManyWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    totalMarks?: IntFieldUpdateOperationsInput | number
    passed?: NullableBoolFieldUpdateOperationsInput | boolean | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    gradedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LiveTestAttemptUpdateWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    passwordUsed?: BoolFieldUpdateOperationsInput | boolean
    setupCompleted?: BoolFieldUpdateOperationsInput | boolean
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    examStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: StringFieldUpdateOperationsInput | string
    flagged?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    totalMarks?: NullableIntFieldUpdateOperationsInput | number | null
    violationFlags?: JsonNullValueInput | InputJsonValue
    proctorDeductions?: IntFieldUpdateOperationsInput | number
    timePenaltySeconds?: IntFieldUpdateOperationsInput | number
    examCurrentIndex?: IntFieldUpdateOperationsInput | number
    endedByProctor?: BoolFieldUpdateOperationsInput | boolean
    endReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutLiveAttemptsNestedInput
    proctorFlags?: LiveProctorFlagUpdateManyWithoutAttemptNestedInput
  }

  export type LiveTestAttemptUncheckedUpdateWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    passwordUsed?: BoolFieldUpdateOperationsInput | boolean
    setupCompleted?: BoolFieldUpdateOperationsInput | boolean
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    examStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: StringFieldUpdateOperationsInput | string
    flagged?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    totalMarks?: NullableIntFieldUpdateOperationsInput | number | null
    violationFlags?: JsonNullValueInput | InputJsonValue
    proctorDeductions?: IntFieldUpdateOperationsInput | number
    timePenaltySeconds?: IntFieldUpdateOperationsInput | number
    examCurrentIndex?: IntFieldUpdateOperationsInput | number
    endedByProctor?: BoolFieldUpdateOperationsInput | boolean
    endReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proctorFlags?: LiveProctorFlagUncheckedUpdateManyWithoutAttemptNestedInput
  }

  export type LiveTestAttemptUncheckedUpdateManyWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    passwordUsed?: BoolFieldUpdateOperationsInput | boolean
    setupCompleted?: BoolFieldUpdateOperationsInput | boolean
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    examStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: StringFieldUpdateOperationsInput | string
    flagged?: StringFieldUpdateOperationsInput | string
    score?: NullableIntFieldUpdateOperationsInput | number | null
    totalMarks?: NullableIntFieldUpdateOperationsInput | number | null
    violationFlags?: JsonNullValueInput | InputJsonValue
    proctorDeductions?: IntFieldUpdateOperationsInput | number
    timePenaltySeconds?: IntFieldUpdateOperationsInput | number
    examCurrentIndex?: IntFieldUpdateOperationsInput | number
    endedByProctor?: BoolFieldUpdateOperationsInput | boolean
    endReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LiveProctorFlagUpdateWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutProctorFlagsNestedInput
    attempt?: LiveTestAttemptUpdateOneWithoutProctorFlagsNestedInput
    proctor?: UserUpdateOneRequiredWithoutProctorFlagsNestedInput
  }

  export type LiveProctorFlagUncheckedUpdateWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    attemptId?: NullableStringFieldUpdateOperationsInput | string | null
    proctorId?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LiveProctorFlagUncheckedUpdateManyWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    attemptId?: NullableStringFieldUpdateOperationsInput | string | null
    proctorId?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LiveProctorFlagCreateManyAttemptInput = {
    id?: string
    testId: string
    studentId: string
    proctorId: string
    note?: string | null
    createdAt?: Date | string
  }

  export type LiveProctorFlagUpdateWithoutAttemptInput = {
    id?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    test?: TestUpdateOneRequiredWithoutProctorFlagsNestedInput
    student?: StudentUpdateOneRequiredWithoutProctorFlagsNestedInput
    proctor?: UserUpdateOneRequiredWithoutProctorFlagsNestedInput
  }

  export type LiveProctorFlagUncheckedUpdateWithoutAttemptInput = {
    id?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    proctorId?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LiveProctorFlagUncheckedUpdateManyWithoutAttemptInput = {
    id?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    proctorId?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}