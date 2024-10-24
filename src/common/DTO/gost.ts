/**
 *
 * @export
 * @interface APIConfig
 */
export interface APIConfig {
  /**
   *
   * @type {boolean}
   * @memberof APIConfig
   */
  accesslog?: boolean;
  /**
   *
   * @type {string}
   * @memberof APIConfig
   */
  addr?: string;
  /**
   *
   * @type {AuthConfig}
   * @memberof APIConfig
   */
  auth?: AuthConfig;
  /**
   *
   * @type {string}
   * @memberof APIConfig
   */
  auther?: string;
  /**
   *
   * @type {string}
   * @memberof APIConfig
   */
  pathPrefix?: string;
}
/**
 *
 * @export
 * @interface AdmissionConfig
 */
export interface AdmissionConfig {
  /**
   *
   * @type {FileLoader}
   * @memberof AdmissionConfig
   */
  file?: FileLoader;
  /**
   *
   * @type {HTTPLoader}
   * @memberof AdmissionConfig
   */
  http?: HTTPLoader;
  /**
   *
   * @type {Array<string>}
   * @memberof AdmissionConfig
   */
  matchers?: Array<string>;
  /**
   *
   * @type {string}
   * @memberof AdmissionConfig
   */
  name?: string;
  /**
   *
   * @type {PluginConfig}
   * @memberof AdmissionConfig
   */
  plugin?: PluginConfig;
  /**
   *
   * @type {RedisLoader}
   * @memberof AdmissionConfig
   */
  redis?: RedisLoader;
  /**
   * A Duration represents the elapsed time between two instants as an int64 nanosecond count. The representation limits the largest representable duration to approximately 290 years.
   * @type {number}
   * @memberof AdmissionConfig
   */
  reload?: number;
  /**
   * DEPRECATED by whitelist since beta.4
   * @type {boolean}
   * @memberof AdmissionConfig
   */
  reverse?: boolean;
  /**
   *
   * @type {boolean}
   * @memberof AdmissionConfig
   */
  whitelist?: boolean;
}
/**
 *
 * @export
 * @interface AuthConfig
 */
export interface AuthConfig {
  /**
   *
   * @type {string}
   * @memberof AuthConfig
   */
  password?: string;
  /**
   *
   * @type {string}
   * @memberof AuthConfig
   */
  username?: string;
}
/**
 *
 * @export
 * @interface AutherConfig
 */
export interface AutherConfig {
  /**
   *
   * @type {Array<AuthConfig>}
   * @memberof AutherConfig
   */
  auths?: Array<AuthConfig>;
  /**
   *
   * @type {FileLoader}
   * @memberof AutherConfig
   */
  file?: FileLoader;
  /**
   *
   * @type {HTTPLoader}
   * @memberof AutherConfig
   */
  http?: HTTPLoader;
  /**
   *
   * @type {string}
   * @memberof AutherConfig
   */
  name?: string;
  /**
   *
   * @type {PluginConfig}
   * @memberof AutherConfig
   */
  plugin?: PluginConfig;
  /**
   *
   * @type {RedisLoader}
   * @memberof AutherConfig
   */
  redis?: RedisLoader;
  /**
   * A Duration represents the elapsed time between two instants as an int64 nanosecond count. The representation limits the largest representable duration to approximately 290 years.
   * @type {number}
   * @memberof AutherConfig
   */
  reload?: number;
}
/**
 *
 * @export
 * @interface BypassConfig
 */
export interface BypassConfig {
  /**
   *
   * @type {FileLoader}
   * @memberof BypassConfig
   */
  file?: FileLoader;
  /**
   *
   * @type {HTTPLoader}
   * @memberof BypassConfig
   */
  http?: HTTPLoader;
  /**
   *
   * @type {Array<string>}
   * @memberof BypassConfig
   */
  matchers?: Array<string>;
  /**
   *
   * @type {string}
   * @memberof BypassConfig
   */
  name?: string;
  /**
   *
   * @type {PluginConfig}
   * @memberof BypassConfig
   */
  plugin?: PluginConfig;
  /**
   *
   * @type {RedisLoader}
   * @memberof BypassConfig
   */
  redis?: RedisLoader;
  /**
   * A Duration represents the elapsed time between two instants as an int64 nanosecond count. The representation limits the largest representable duration to approximately 290 years.
   * @type {number}
   * @memberof BypassConfig
   */
  reload?: number;
  /**
   * DEPRECATED by whitelist since beta.4
   * @type {boolean}
   * @memberof BypassConfig
   */
  reverse?: boolean;
  /**
   *
   * @type {boolean}
   * @memberof BypassConfig
   */
  whitelist?: boolean;
}
/**
 *
 * @export
 * @interface ChainConfig
 */
export interface ChainConfig {
  /**
   *
   * @type {Array<HopConfig>}
   * @memberof ChainConfig
   */
  hops?: Array<HopConfig>;
  /**
   *
   * @type {{ [key: string]: any; }}
   * @memberof ChainConfig
   */
  metadata?: { [key: string]: any };
  /**
   *
   * @type {string}
   * @memberof ChainConfig
   */
  name?: string;
}
/**
 *
 * @export
 * @interface ChainGroupConfig
 */
export interface ChainGroupConfig {
  /**
   *
   * @type {Array<string>}
   * @memberof ChainGroupConfig
   */
  chains?: Array<string>;
  /**
   *
   * @type {SelectorConfig}
   * @memberof ChainGroupConfig
   */
  selector?: SelectorConfig;
}
/**
 *
 * @export
 * @interface Config
 */
export interface Config {
  /**
   *
   * @type {Array<AdmissionConfig>}
   * @memberof Config
   */
  admissions?: Array<AdmissionConfig>;
  /**
   *
   * @type {APIConfig}
   * @memberof Config
   */
  api?: APIConfig;
  /**
   *
   * @type {Array<AutherConfig>}
   * @memberof Config
   */
  authers?: Array<AutherConfig>;
  /**
   *
   * @type {Array<BypassConfig>}
   * @memberof Config
   */
  bypasses?: Array<BypassConfig>;
  /**
   *
   * @type {Array<ChainConfig>}
   * @memberof Config
   */
  chains?: Array<ChainConfig>;
  /**
   *
   * @type {Array<LimiterConfig>}
   * @memberof Config
   */
  climiters?: Array<LimiterConfig>;
  /**
   *
   * @type {Array<HopConfig>}
   * @memberof Config
   */
  hops?: Array<HopConfig>;
  /**
   *
   * @type {Array<HostsConfig>}
   * @memberof Config
   */
  hosts?: Array<HostsConfig>;
  /**
   *
   * @type {Array<IngressConfig>}
   * @memberof Config
   */
  ingresses?: Array<IngressConfig>;
  /**
   *
   * @type {Array<LimiterConfig>}
   * @memberof Config
   */
  limiters?: Array<LimiterConfig>;
  /**
   *
   * @type {LogConfig}
   * @memberof Config
   */
  log?: LogConfig;
  /**
   *
   * @type {Array<LoggerConfig>}
   * @memberof Config
   */
  loggers?: Array<LoggerConfig>;
  /**
   *
   * @type {MetricsConfig}
   * @memberof Config
   */
  metrics?: MetricsConfig;
  /**
   *
   * @type {Array<ObserverConfig>}
   * @memberof Config
   */
  observers?: Array<ObserverConfig>;
  /**
   *
   * @type {ProfilingConfig}
   * @memberof Config
   */
  profiling?: ProfilingConfig;
  /**
   *
   * @type {Array<RecorderConfig>}
   * @memberof Config
   */
  recorders?: Array<RecorderConfig>;
  /**
   *
   * @type {Array<ResolverConfig>}
   * @memberof Config
   */
  resolvers?: Array<ResolverConfig>;
  /**
   *
   * @type {Array<LimiterConfig>}
   * @memberof Config
   */
  rlimiters?: Array<LimiterConfig>;
  /**
   *
   * @type {Array<RouterConfig>}
   * @memberof Config
   */
  routers?: Array<RouterConfig>;
  /**
   *
   * @type {Array<SDConfig>}
   * @memberof Config
   */
  sds?: Array<SDConfig>;
  /**
   *
   * @type {Array<ServiceConfig>}
   * @memberof Config
   */
  services?: Array<ServiceConfig>;
  /**
   *
   * @type {TLSConfig}
   * @memberof Config
   */
  tls?: TLSConfig;
}
/**
 *
 * @export
 * @interface ConnectorConfig
 */
export interface ConnectorConfig {
  /**
   *
   * @type {AuthConfig}
   * @memberof ConnectorConfig
   */
  auth?: AuthConfig;
  /**
   *
   * @type {{ [key: string]: any; }}
   * @memberof ConnectorConfig
   */
  metadata?: { [key: string]: any };
  /**
   *
   * @type {TLSConfig}
   * @memberof ConnectorConfig
   */
  tls?: TLSConfig;
  /**
   *
   * @type {string}
   * @memberof ConnectorConfig
   */
  type?: string;
}
/**
 *
 * @export
 * @interface DialerConfig
 */
export interface DialerConfig {
  /**
   *
   * @type {AuthConfig}
   * @memberof DialerConfig
   */
  auth?: AuthConfig;
  /**
   *
   * @type {{ [key: string]: any; }}
   * @memberof DialerConfig
   */
  metadata?: { [key: string]: any };
  /**
   *
   * @type {TLSConfig}
   * @memberof DialerConfig
   */
  tls?: TLSConfig;
  /**
   *
   * @type {string}
   * @memberof DialerConfig
   */
  type?: string;
}
/**
 *
 * @export
 * @interface FileLoader
 */
export interface FileLoader {
  /**
   *
   * @type {string}
   * @memberof FileLoader
   */
  path?: string;
}
/**
 *
 * @export
 * @interface FileRecorder
 */
export interface FileRecorder {
  /**
   *
   * @type {string}
   * @memberof FileRecorder
   */
  path?: string;
  /**
   *
   * @type {string}
   * @memberof FileRecorder
   */
  sep?: string;
}
/**
 *
 * @export
 * @interface ForwardNodeConfig
 */
export interface ForwardNodeConfig {
  /**
   *
   * @type {string}
   * @memberof ForwardNodeConfig
   */
  addr?: string;
  /**
   *
   * @type {AuthConfig}
   * @memberof ForwardNodeConfig
   */
  auth?: AuthConfig;
  /**
   *
   * @type {string}
   * @memberof ForwardNodeConfig
   */
  bypass?: string;
  /**
   *
   * @type {Array<string>}
   * @memberof ForwardNodeConfig
   */
  bypasses?: Array<string>;
  /**
   *
   * @type {NodeFilterConfig}
   * @memberof ForwardNodeConfig
   */
  filter?: NodeFilterConfig;
  /**
   * DEPRECATED by filter.host
   * @type {string}
   * @memberof ForwardNodeConfig
   */
  host?: string;
  /**
   *
   * @type {HTTPNodeConfig}
   * @memberof ForwardNodeConfig
   */
  http?: HTTPNodeConfig;
  /**
   *
   * @type {{ [key: string]: any; }}
   * @memberof ForwardNodeConfig
   */
  metadata?: { [key: string]: any };
  /**
   *
   * @type {string}
   * @memberof ForwardNodeConfig
   */
  name?: string;
  /**
   *
   * @type {string}
   * @memberof ForwardNodeConfig
   */
  network?: string;
  /**
   * DEPRECATED by filter.path
   * @type {string}
   * @memberof ForwardNodeConfig
   */
  path?: string;
  /**
   * DEPRECATED by filter.protocol
   * @type {string}
   * @memberof ForwardNodeConfig
   */
  protocol?: string;
  /**
   *
   * @type {TLSNodeConfig}
   * @memberof ForwardNodeConfig
   */
  tls?: TLSNodeConfig;
}
/**
 *
 * @export
 * @interface ForwarderConfig
 */
export interface ForwarderConfig {
  /**
   * the referenced hop name
   * @type {string}
   * @memberof ForwarderConfig
   */
  hop?: string;
  /**
   * DEPRECATED by hop field
   * @type {string}
   * @memberof ForwarderConfig
   */
  name?: string;
  /**
   *
   * @type {Array<ForwardNodeConfig>}
   * @memberof ForwarderConfig
   */
  nodes?: Array<ForwardNodeConfig>;
  /**
   *
   * @type {SelectorConfig}
   * @memberof ForwarderConfig
   */
  selector?: SelectorConfig;
}
/**
 *
 * @export
 * @interface HTTPLoader
 */
export interface HTTPLoader {
  /**
   * A Duration represents the elapsed time between two instants as an int64 nanosecond count. The representation limits the largest representable duration to approximately 290 years.
   * @type {number}
   * @memberof HTTPLoader
   */
  timeout?: number;
  /**
   *
   * @type {string}
   * @memberof HTTPLoader
   */
  url?: string;
}
/**
 *
 * @export
 * @interface HTTPNodeConfig
 */
export interface HTTPNodeConfig {
  /**
   *
   * @type {AuthConfig}
   * @memberof HTTPNodeConfig
   */
  auth?: AuthConfig;
  /**
   *
   * @type {{ [key: string]: string; }}
   * @memberof HTTPNodeConfig
   */
  header?: { [key: string]: string };
  /**
   *
   * @type {string}
   * @memberof HTTPNodeConfig
   */
  host?: string;
  /**
   *
   * @type {Array<HTTPURLRewriteConfig>}
   * @memberof HTTPNodeConfig
   */
  rewrite?: Array<HTTPURLRewriteConfig>;
}
/**
 *
 * @export
 * @interface HTTPRecorder
 */
export interface HTTPRecorder {
  /**
   * A Duration represents the elapsed time between two instants as an int64 nanosecond count. The representation limits the largest representable duration to approximately 290 years.
   * @type {number}
   * @memberof HTTPRecorder
   */
  timeout?: number;
  /**
   *
   * @type {string}
   * @memberof HTTPRecorder
   */
  url?: string;
}
/**
 *
 * @export
 * @interface HTTPURLRewriteConfig
 */
export interface HTTPURLRewriteConfig {
  /**
   *
   * @type {string}
   * @memberof HTTPURLRewriteConfig
   */
  Match?: string;
  /**
   *
   * @type {string}
   * @memberof HTTPURLRewriteConfig
   */
  Replacement?: string;
}
/**
 *
 * @export
 * @interface HandlerConfig
 */
export interface HandlerConfig {
  /**
   *
   * @type {AuthConfig}
   * @memberof HandlerConfig
   */
  auth?: AuthConfig;
  /**
   *
   * @type {string}
   * @memberof HandlerConfig
   */
  auther?: string;
  /**
   *
   * @type {Array<string>}
   * @memberof HandlerConfig
   */
  authers?: Array<string>;
  /**
   *
   * @type {string}
   * @memberof HandlerConfig
   */
  chain?: string;
  /**
   *
   * @type {ChainGroupConfig}
   * @memberof HandlerConfig
   */
  chainGroup?: ChainGroupConfig;
  /**
   *
   * @type {string}
   * @memberof HandlerConfig
   */
  limiter?: string;
  /**
   *
   * @type {{ [key: string]: any; }}
   * @memberof HandlerConfig
   */
  metadata?: { [key: string]: any };
  /**
   *
   * @type {string}
   * @memberof HandlerConfig
   */
  observer?: string;
  /**
   *
   * @type {number}
   * @memberof HandlerConfig
   */
  retries?: number;
  /**
   *
   * @type {TLSConfig}
   * @memberof HandlerConfig
   */
  tls?: TLSConfig;
  /**
   *
   * @type {string}
   * @memberof HandlerConfig
   */
  type?: string;
}
/**
 *
 * @export
 * @interface HopConfig
 */
export interface HopConfig {
  /**
   *
   * @type {string}
   * @memberof HopConfig
   */
  bypass?: string;
  /**
   *
   * @type {Array<string>}
   * @memberof HopConfig
   */
  bypasses?: Array<string>;
  /**
   *
   * @type {FileLoader}
   * @memberof HopConfig
   */
  file?: FileLoader;
  /**
   *
   * @type {string}
   * @memberof HopConfig
   */
  hosts?: string;
  /**
   *
   * @type {HTTPLoader}
   * @memberof HopConfig
   */
  http?: HTTPLoader;
  /**
   *
   * @type {string}
   * @memberof HopConfig
   */
  interface?: string;
  /**
   *
   * @type {string}
   * @memberof HopConfig
   */
  name?: string;
  /**
   *
   * @type {Array<NodeConfig>}
   * @memberof HopConfig
   */
  nodes?: Array<NodeConfig>;
  /**
   *
   * @type {PluginConfig}
   * @memberof HopConfig
   */
  plugin?: PluginConfig;
  /**
   *
   * @type {RedisLoader}
   * @memberof HopConfig
   */
  redis?: RedisLoader;
  /**
   * A Duration represents the elapsed time between two instants as an int64 nanosecond count. The representation limits the largest representable duration to approximately 290 years.
   * @type {number}
   * @memberof HopConfig
   */
  reload?: number;
  /**
   *
   * @type {string}
   * @memberof HopConfig
   */
  resolver?: string;
  /**
   *
   * @type {SelectorConfig}
   * @memberof HopConfig
   */
  selector?: SelectorConfig;
  /**
   *
   * @type {SockOptsConfig}
   * @memberof HopConfig
   */
  sockopts?: SockOptsConfig;
}
/**
 *
 * @export
 * @interface HostMappingConfig
 */
export interface HostMappingConfig {
  /**
   *
   * @type {Array<string>}
   * @memberof HostMappingConfig
   */
  aliases?: Array<string>;
  /**
   *
   * @type {string}
   * @memberof HostMappingConfig
   */
  hostname?: string;
  /**
   *
   * @type {string}
   * @memberof HostMappingConfig
   */
  ip?: string;
}
/**
 *
 * @export
 * @interface HostsConfig
 */
export interface HostsConfig {
  /**
   *
   * @type {FileLoader}
   * @memberof HostsConfig
   */
  file?: FileLoader;
  /**
   *
   * @type {HTTPLoader}
   * @memberof HostsConfig
   */
  http?: HTTPLoader;
  /**
   *
   * @type {Array<HostMappingConfig>}
   * @memberof HostsConfig
   */
  mappings?: Array<HostMappingConfig>;
  /**
   *
   * @type {string}
   * @memberof HostsConfig
   */
  name?: string;
  /**
   *
   * @type {PluginConfig}
   * @memberof HostsConfig
   */
  plugin?: PluginConfig;
  /**
   *
   * @type {RedisLoader}
   * @memberof HostsConfig
   */
  redis?: RedisLoader;
  /**
   * A Duration represents the elapsed time between two instants as an int64 nanosecond count. The representation limits the largest representable duration to approximately 290 years.
   * @type {number}
   * @memberof HostsConfig
   */
  reload?: number;
}
/**
 *
 * @export
 * @interface IngressConfig
 */
export interface IngressConfig {
  /**
   *
   * @type {FileLoader}
   * @memberof IngressConfig
   */
  file?: FileLoader;
  /**
   *
   * @type {HTTPLoader}
   * @memberof IngressConfig
   */
  http?: HTTPLoader;
  /**
   *
   * @type {string}
   * @memberof IngressConfig
   */
  name?: string;
  /**
   *
   * @type {PluginConfig}
   * @memberof IngressConfig
   */
  plugin?: PluginConfig;
  /**
   *
   * @type {RedisLoader}
   * @memberof IngressConfig
   */
  redis?: RedisLoader;
  /**
   * A Duration represents the elapsed time between two instants as an int64 nanosecond count. The representation limits the largest representable duration to approximately 290 years.
   * @type {number}
   * @memberof IngressConfig
   */
  reload?: number;
  /**
   *
   * @type {Array<IngressRuleConfig>}
   * @memberof IngressConfig
   */
  rules?: Array<IngressRuleConfig>;
}
/**
 *
 * @export
 * @interface IngressRuleConfig
 */
export interface IngressRuleConfig {
  /**
   *
   * @type {string}
   * @memberof IngressRuleConfig
   */
  endpoint?: string;
  /**
   *
   * @type {string}
   * @memberof IngressRuleConfig
   */
  hostname?: string;
}
/**
 *
 * @export
 * @interface LimiterConfig
 */
export interface LimiterConfig {
  /**
   *
   * @type {FileLoader}
   * @memberof LimiterConfig
   */
  file?: FileLoader;
  /**
   *
   * @type {HTTPLoader}
   * @memberof LimiterConfig
   */
  http?: HTTPLoader;
  /**
   *
   * @type {Array<string>}
   * @memberof LimiterConfig
   */
  limits?: Array<string>;
  /**
   *
   * @type {string}
   * @memberof LimiterConfig
   */
  name?: string;
  /**
   *
   * @type {PluginConfig}
   * @memberof LimiterConfig
   */
  plugin?: PluginConfig;
  /**
   *
   * @type {RedisLoader}
   * @memberof LimiterConfig
   */
  redis?: RedisLoader;
  /**
   * A Duration represents the elapsed time between two instants as an int64 nanosecond count. The representation limits the largest representable duration to approximately 290 years.
   * @type {number}
   * @memberof LimiterConfig
   */
  reload?: number;
}
/**
 *
 * @export
 * @interface ListenerConfig
 */
export interface ListenerConfig {
  /**
   *
   * @type {AuthConfig}
   * @memberof ListenerConfig
   */
  auth?: AuthConfig;
  /**
   *
   * @type {string}
   * @memberof ListenerConfig
   */
  auther?: string;
  /**
   *
   * @type {Array<string>}
   * @memberof ListenerConfig
   */
  authers?: Array<string>;
  /**
   *
   * @type {string}
   * @memberof ListenerConfig
   */
  chain?: string;
  /**
   *
   * @type {ChainGroupConfig}
   * @memberof ListenerConfig
   */
  chainGroup?: ChainGroupConfig;
  /**
   *
   * @type {{ [key: string]: any; }}
   * @memberof ListenerConfig
   */
  metadata?: { [key: string]: any };
  /**
   *
   * @type {TLSConfig}
   * @memberof ListenerConfig
   */
  tls?: TLSConfig;
  /**
   *
   * @type {string}
   * @memberof ListenerConfig
   */
  type?: string;
}
/**
 *
 * @export
 * @interface LogConfig
 */
export interface LogConfig {
  /**
   *
   * @type {string}
   * @memberof LogConfig
   */
  format?: string;
  /**
   *
   * @type {string}
   * @memberof LogConfig
   */
  level?: string;
  /**
   *
   * @type {string}
   * @memberof LogConfig
   */
  output?: string;
  /**
   *
   * @type {LogRotationConfig}
   * @memberof LogConfig
   */
  rotation?: LogRotationConfig;
}
/**
 *
 * @export
 * @interface LogRotationConfig
 */
export interface LogRotationConfig {
  /**
   * Compress determines if the rotated log files should be compressed using gzip. The default is not to perform compression.
   * @type {boolean}
   * @memberof LogRotationConfig
   */
  compress?: boolean;
  /**
   * LocalTime determines if the time used for formatting the timestamps in backup files is the computer\'s local time. The default is to use UTC time.
   * @type {boolean}
   * @memberof LogRotationConfig
   */
  localTime?: boolean;
  /**
   * MaxAge is the maximum number of days to retain old log files based on the timestamp encoded in their filename.  Note that a day is defined as 24 hours and may not exactly correspond to calendar days due to daylight savings, leap seconds, etc. The default is not to remove old log files based on age.
   * @type {number}
   * @memberof LogRotationConfig
   */
  maxAge?: number;
  /**
   * MaxBackups is the maximum number of old log files to retain.  The default is to retain all old log files (though MaxAge may still cause them to get deleted.)
   * @type {number}
   * @memberof LogRotationConfig
   */
  maxBackups?: number;
  /**
   * MaxSize is the maximum size in megabytes of the log file before it gets rotated. It defaults to 100 megabytes.
   * @type {number}
   * @memberof LogRotationConfig
   */
  maxSize?: number;
}
/**
 *
 * @export
 * @interface LoggerConfig
 */
export interface LoggerConfig {
  /**
   *
   * @type {LogConfig}
   * @memberof LoggerConfig
   */
  log?: LogConfig;
  /**
   *
   * @type {string}
   * @memberof LoggerConfig
   */
  name?: string;
}
/**
 *
 * @export
 * @interface MetricsConfig
 */
export interface MetricsConfig {
  /**
   *
   * @type {string}
   * @memberof MetricsConfig
   */
  addr?: string;
  /**
   *
   * @type {AuthConfig}
   * @memberof MetricsConfig
   */
  auth?: AuthConfig;
  /**
   *
   * @type {string}
   * @memberof MetricsConfig
   */
  auther?: string;
  /**
   *
   * @type {string}
   * @memberof MetricsConfig
   */
  path?: string;
}
/**
 *
 * @export
 * @interface NameserverConfig
 */
export interface NameserverConfig {
  /**
   *
   * @type {string}
   * @memberof NameserverConfig
   */
  addr?: string;
  /**
   *
   * @type {boolean}
   * @memberof NameserverConfig
   */
  async?: boolean;
  /**
   *
   * @type {string}
   * @memberof NameserverConfig
   */
  chain?: string;
  /**
   *
   * @type {string}
   * @memberof NameserverConfig
   */
  clientIP?: string;
  /**
   *
   * @type {string}
   * @memberof NameserverConfig
   */
  hostname?: string;
  /**
   *
   * @type {string}
   * @memberof NameserverConfig
   */
  only?: string;
  /**
   *
   * @type {string}
   * @memberof NameserverConfig
   */
  prefer?: string;
  /**
   * A Duration represents the elapsed time between two instants as an int64 nanosecond count. The representation limits the largest representable duration to approximately 290 years.
   * @type {number}
   * @memberof NameserverConfig
   */
  timeout?: number;
  /**
   * A Duration represents the elapsed time between two instants as an int64 nanosecond count. The representation limits the largest representable duration to approximately 290 years.
   * @type {number}
   * @memberof NameserverConfig
   */
  ttl?: number;
}
/**
 *
 * @export
 * @interface NodeConfig
 */
export interface NodeConfig {
  /**
   *
   * @type {string}
   * @memberof NodeConfig
   */
  addr?: string;
  /**
   *
   * @type {string}
   * @memberof NodeConfig
   */
  bypass?: string;
  /**
   *
   * @type {Array<string>}
   * @memberof NodeConfig
   */
  bypasses?: Array<string>;
  /**
   *
   * @type {ConnectorConfig}
   * @memberof NodeConfig
   */
  connector?: ConnectorConfig;
  /**
   *
   * @type {DialerConfig}
   * @memberof NodeConfig
   */
  dialer?: DialerConfig;
  /**
   *
   * @type {NodeFilterConfig}
   * @memberof NodeConfig
   */
  filter?: NodeFilterConfig;
  /**
   *
   * @type {string}
   * @memberof NodeConfig
   */
  hosts?: string;
  /**
   *
   * @type {HTTPNodeConfig}
   * @memberof NodeConfig
   */
  http?: HTTPNodeConfig;
  /**
   *
   * @type {string}
   * @memberof NodeConfig
   */
  interface?: string;
  /**
   *
   * @type {{ [key: string]: any; }}
   * @memberof NodeConfig
   */
  metadata?: { [key: string]: any };
  /**
   *
   * @type {string}
   * @memberof NodeConfig
   */
  name?: string;
  /**
   *
   * @type {string}
   * @memberof NodeConfig
   */
  network?: string;
  /**
   *
   * @type {string}
   * @memberof NodeConfig
   */
  resolver?: string;
  /**
   *
   * @type {SockOptsConfig}
   * @memberof NodeConfig
   */
  sockopts?: SockOptsConfig;
  /**
   *
   * @type {TLSNodeConfig}
   * @memberof NodeConfig
   */
  tls?: TLSNodeConfig;
}
/**
 *
 * @export
 * @interface NodeFilterConfig
 */
export interface NodeFilterConfig {
  /**
   *
   * @type {string}
   * @memberof NodeFilterConfig
   */
  host?: string;
  /**
   *
   * @type {string}
   * @memberof NodeFilterConfig
   */
  path?: string;
  /**
   *
   * @type {string}
   * @memberof NodeFilterConfig
   */
  protocol?: string;
}
/**
 *
 * @export
 * @interface ObserverConfig
 */
export interface ObserverConfig {
  /**
   *
   * @type {string}
   * @memberof ObserverConfig
   */
  name?: string;
  /**
   *
   * @type {PluginConfig}
   * @memberof ObserverConfig
   */
  plugin?: PluginConfig;
}
/**
 *
 * @export
 * @interface PluginConfig
 */
export interface PluginConfig {
  /**
   *
   * @type {string}
   * @memberof PluginConfig
   */
  addr?: string;
  /**
   * A Duration represents the elapsed time between two instants as an int64 nanosecond count. The representation limits the largest representable duration to approximately 290 years.
   * @type {number}
   * @memberof PluginConfig
   */
  timeout?: number;
  /**
   *
   * @type {TLSConfig}
   * @memberof PluginConfig
   */
  tls?: TLSConfig;
  /**
   *
   * @type {string}
   * @memberof PluginConfig
   */
  token?: string;
  /**
   *
   * @type {string}
   * @memberof PluginConfig
   */
  type?: string;
}
/**
 *
 * @export
 * @interface ProfilingConfig
 */
export interface ProfilingConfig {
  /**
   *
   * @type {string}
   * @memberof ProfilingConfig
   */
  addr?: string;
}
/**
 *
 * @export
 * @interface RecorderConfig
 */
export interface RecorderConfig {
  /**
   *
   * @type {FileRecorder}
   * @memberof RecorderConfig
   */
  file?: FileRecorder;
  /**
   *
   * @type {HTTPRecorder}
   * @memberof RecorderConfig
   */
  http?: HTTPRecorder;
  /**
   *
   * @type {string}
   * @memberof RecorderConfig
   */
  name?: string;
  /**
   *
   * @type {PluginConfig}
   * @memberof RecorderConfig
   */
  plugin?: PluginConfig;
  /**
   *
   * @type {RedisRecorder}
   * @memberof RecorderConfig
   */
  redis?: RedisRecorder;
  /**
   *
   * @type {TCPRecorder}
   * @memberof RecorderConfig
   */
  tcp?: TCPRecorder;
}
/**
 *
 * @export
 * @interface RecorderObject
 */
export interface RecorderObject {
  /**
   *
   * @type {{ [key: string]: any; }}
   * @memberof RecorderObject
   */
  Metadata?: { [key: string]: any };
  /**
   *
   * @type {string}
   * @memberof RecorderObject
   */
  name?: string;
  /**
   *
   * @type {string}
   * @memberof RecorderObject
   */
  record?: string;
}
/**
 *
 * @export
 * @interface RedisLoader
 */
export interface RedisLoader {
  /**
   *
   * @type {string}
   * @memberof RedisLoader
   */
  addr?: string;
  /**
   *
   * @type {number}
   * @memberof RedisLoader
   */
  db?: number;
  /**
   *
   * @type {string}
   * @memberof RedisLoader
   */
  key?: string;
  /**
   *
   * @type {string}
   * @memberof RedisLoader
   */
  password?: string;
  /**
   *
   * @type {string}
   * @memberof RedisLoader
   */
  type?: string;
}
/**
 *
 * @export
 * @interface RedisRecorder
 */
export interface RedisRecorder {
  /**
   *
   * @type {string}
   * @memberof RedisRecorder
   */
  addr?: string;
  /**
   *
   * @type {number}
   * @memberof RedisRecorder
   */
  db?: number;
  /**
   *
   * @type {string}
   * @memberof RedisRecorder
   */
  key?: string;
  /**
   *
   * @type {string}
   * @memberof RedisRecorder
   */
  password?: string;
  /**
   *
   * @type {string}
   * @memberof RedisRecorder
   */
  type?: string;
}
/**
 *
 * @export
 * @interface ResolverConfig
 */
export interface ResolverConfig {
  /**
   *
   * @type {string}
   * @memberof ResolverConfig
   */
  name?: string;
  /**
   *
   * @type {Array<NameserverConfig>}
   * @memberof ResolverConfig
   */
  nameservers?: Array<NameserverConfig>;
  /**
   *
   * @type {PluginConfig}
   * @memberof ResolverConfig
   */
  plugin?: PluginConfig;
}
/**
 *
 * @export
 * @interface Response
 */
export interface Response {
  /**
   *
   * @type {number}
   * @memberof Response
   */
  code?: number;
  /**
   *
   * @type {string}
   * @memberof Response
   */
  msg?: string;
}
/**
 *
 * @export
 * @interface RouterConfig
 */
export interface RouterConfig {
  /**
   *
   * @type {FileLoader}
   * @memberof RouterConfig
   */
  file?: FileLoader;
  /**
   *
   * @type {HTTPLoader}
   * @memberof RouterConfig
   */
  http?: HTTPLoader;
  /**
   *
   * @type {string}
   * @memberof RouterConfig
   */
  name?: string;
  /**
   *
   * @type {PluginConfig}
   * @memberof RouterConfig
   */
  plugin?: PluginConfig;
  /**
   *
   * @type {RedisLoader}
   * @memberof RouterConfig
   */
  redis?: RedisLoader;
  /**
   * A Duration represents the elapsed time between two instants as an int64 nanosecond count. The representation limits the largest representable duration to approximately 290 years.
   * @type {number}
   * @memberof RouterConfig
   */
  reload?: number;
  /**
   *
   * @type {Array<RouterRouteConfig>}
   * @memberof RouterConfig
   */
  routes?: Array<RouterRouteConfig>;
}
/**
 *
 * @export
 * @interface RouterRouteConfig
 */
export interface RouterRouteConfig {
  /**
   *
   * @type {string}
   * @memberof RouterRouteConfig
   */
  gateway?: string;
  /**
   *
   * @type {string}
   * @memberof RouterRouteConfig
   */
  net?: string;
}
/**
 *
 * @export
 * @interface SDConfig
 */
export interface SDConfig {
  /**
   *
   * @type {string}
   * @memberof SDConfig
   */
  name?: string;
  /**
   *
   * @type {PluginConfig}
   * @memberof SDConfig
   */
  plugin?: PluginConfig;
}
/**
 *
 * @export
 * @interface SelectorConfig
 */
export interface SelectorConfig {
  /**
   * A Duration represents the elapsed time between two instants as an int64 nanosecond count. The representation limits the largest representable duration to approximately 290 years.
   * @type {number}
   * @memberof SelectorConfig
   */
  failTimeout?: number;
  /**
   *
   * @type {number}
   * @memberof SelectorConfig
   */
  maxFails?: number;
  /**
   *
   * @type {string}
   * @memberof SelectorConfig
   */
  strategy?: string;
}
/**
 *
 * @export
 * @interface ServiceConfig
 */
export interface ServiceConfig {
  /**
   *
   * @type {string}
   * @memberof ServiceConfig
   */
  addr?: string;
  /**
   *
   * @type {string}
   * @memberof ServiceConfig
   */
  admission?: string;
  /**
   *
   * @type {Array<string>}
   * @memberof ServiceConfig
   */
  admissions?: Array<string>;
  /**
   *
   * @type {string}
   * @memberof ServiceConfig
   */
  bypass?: string;
  /**
   *
   * @type {Array<string>}
   * @memberof ServiceConfig
   */
  bypasses?: Array<string>;
  /**
   *
   * @type {string}
   * @memberof ServiceConfig
   */
  climiter?: string;
  /**
   *
   * @type {ForwarderConfig}
   * @memberof ServiceConfig
   */
  forwarder?: ForwarderConfig;
  /**
   *
   * @type {HandlerConfig}
   * @memberof ServiceConfig
   */
  handler?: HandlerConfig;
  /**
   *
   * @type {string}
   * @memberof ServiceConfig
   */
  hosts?: string;
  /**
   * DEPRECATED by metadata.interface since beta.5
   * @type {string}
   * @memberof ServiceConfig
   */
  interface?: string;
  /**
   *
   * @type {string}
   * @memberof ServiceConfig
   */
  limiter?: string;
  /**
   *
   * @type {ListenerConfig}
   * @memberof ServiceConfig
   */
  listener?: ListenerConfig;
  /**
   *
   * @type {string}
   * @memberof ServiceConfig
   */
  logger?: string;
  /**
   *
   * @type {Array<string>}
   * @memberof ServiceConfig
   */
  loggers?: Array<string>;
  /**
   *
   * @type {{ [key: string]: any; }}
   * @memberof ServiceConfig
   */
  metadata?: { [key: string]: any };
  /**
   *
   * @type {string}
   * @memberof ServiceConfig
   */
  name?: string;
  /**
   *
   * @type {string}
   * @memberof ServiceConfig
   */
  observer?: string;
  /**
   *
   * @type {Array<RecorderObject>}
   * @memberof ServiceConfig
   */
  recorders?: Array<RecorderObject>;
  /**
   *
   * @type {string}
   * @memberof ServiceConfig
   */
  resolver?: string;
  /**
   *
   * @type {string}
   * @memberof ServiceConfig
   */
  rlimiter?: string;
  /**
   *
   * @type {SockOptsConfig}
   * @memberof ServiceConfig
   */
  sockopts?: SockOptsConfig;
  /**
   *
   * @type {ServiceStatus}
   * @memberof ServiceConfig
   */
  status?: ServiceStatus;
}
/**
 *
 * @export
 * @interface ServiceEvent
 */
export interface ServiceEvent {
  /**
   *
   * @type {string}
   * @memberof ServiceEvent
   */
  msg?: string;
  /**
   *
   * @type {number}
   * @memberof ServiceEvent
   */
  time?: number;
}
/**
 *
 * @export
 * @interface ServiceStats
 */
export interface ServiceStats {
  /**
   *
   * @type {number}
   * @memberof ServiceStats
   */
  currentConns?: number;
  /**
   *
   * @type {number}
   * @memberof ServiceStats
   */
  inputBytes?: number;
  /**
   *
   * @type {number}
   * @memberof ServiceStats
   */
  outputBytes?: number;
  /**
   *
   * @type {number}
   * @memberof ServiceStats
   */
  totalConns?: number;
  /**
   *
   * @type {number}
   * @memberof ServiceStats
   */
  totalErrs?: number;
}
/**
 *
 * @export
 * @interface ServiceStatus
 */
export interface ServiceStatus {
  /**
   *
   * @type {number}
   * @memberof ServiceStatus
   */
  createTime?: number;
  /**
   *
   * @type {Array<ServiceEvent>}
   * @memberof ServiceStatus
   */
  events?: Array<ServiceEvent>;
  /**
   *
   * @type {string}
   * @memberof ServiceStatus
   */
  state?: string;
  /**
   *
   * @type {ServiceStats}
   * @memberof ServiceStatus
   */
  stats?: ServiceStats;
}
/**
 *
 * @export
 * @interface SockOptsConfig
 */
export interface SockOptsConfig {
  /**
   *
   * @type {number}
   * @memberof SockOptsConfig
   */
  mark?: number;
}
/**
 *
 * @export
 * @interface TCPRecorder
 */
export interface TCPRecorder {
  /**
   *
   * @type {string}
   * @memberof TCPRecorder
   */
  addr?: string;
  /**
   * A Duration represents the elapsed time between two instants as an int64 nanosecond count. The representation limits the largest representable duration to approximately 290 years.
   * @type {number}
   * @memberof TCPRecorder
   */
  timeout?: number;
}
/**
 *
 * @export
 * @interface TLSConfig
 */
export interface TLSConfig {
  /**
   *
   * @type {string}
   * @memberof TLSConfig
   */
  caFile?: string;
  /**
   *
   * @type {string}
   * @memberof TLSConfig
   */
  certFile?: string;
  /**
   *
   * @type {string}
   * @memberof TLSConfig
   */
  commonName?: string;
  /**
   *
   * @type {string}
   * @memberof TLSConfig
   */
  keyFile?: string;
  /**
   *
   * @type {TLSOptions}
   * @memberof TLSConfig
   */
  options?: TLSOptions;
  /**
   *
   * @type {string}
   * @memberof TLSConfig
   */
  organization?: string;
  /**
   *
   * @type {boolean}
   * @memberof TLSConfig
   */
  secure?: boolean;
  /**
   *
   * @type {string}
   * @memberof TLSConfig
   */
  serverName?: string;
  /**
   * A Duration represents the elapsed time between two instants as an int64 nanosecond count. The representation limits the largest representable duration to approximately 290 years.
   * @type {number}
   * @memberof TLSConfig
   */
  validity?: number;
}
/**
 *
 * @export
 * @interface TLSNodeConfig
 */
export interface TLSNodeConfig {
  /**
   *
   * @type {TLSOptions}
   * @memberof TLSNodeConfig
   */
  options?: TLSOptions;
  /**
   *
   * @type {boolean}
   * @memberof TLSNodeConfig
   */
  secure?: boolean;
  /**
   *
   * @type {string}
   * @memberof TLSNodeConfig
   */
  serverName?: string;
}
/**
 *
 * @export
 * @interface TLSOptions
 */
export interface TLSOptions {
  /**
   *
   * @type {Array<string>}
   * @memberof TLSOptions
   */
  cipherSuites?: Array<string>;
  /**
   *
   * @type {string}
   * @memberof TLSOptions
   */
  maxVersion?: string;
  /**
   *
   * @type {string}
   * @memberof TLSOptions
   */
  minVersion?: string;
}
