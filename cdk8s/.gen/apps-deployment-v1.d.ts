import { ApiObject } from 'cdk8s';
import { Construct } from '@aws-cdk/core';
/**
 * Deployment enables declarative updates for Pods and ReplicaSets.
 */
export declare class Deployment extends ApiObject {
    constructor(scope: Construct, ns: string, options: DeploymentOptions);
}
/**
 * Deployment enables declarative updates for Pods and ReplicaSets.
 */
export interface DeploymentOptions {
    /**
     * Standard object metadata.
     */
    readonly metadata?: ObjectMeta;
    /**
     * Specification of the desired behavior of the Deployment.
     */
    readonly spec?: DeploymentSpec;
}
/**
 * ObjectMeta is metadata that all persisted resources must have, which includes all objects users must create.
 */
export interface ObjectMeta {
    /**
     * Annotations is an unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: http://kubernetes.io/docs/user-guide/annotations
     */
    readonly annotations?: {
        [key: string]: string;
    };
    /**
     * The name of the cluster which the object belongs to. This is used to distinguish resources with same name and namespace in different clusters. This field is not set anywhere right now and apiserver is going to ignore it if set in create or update request.
     */
    readonly clusterName?: string;
    /**
     * CreationTimestamp is a timestamp representing the server time when this object was created. It is not guaranteed to be set in happens-before order across separate operations. Clients may not set this value. It is represented in RFC3339 form and is in UTC.
  
  Populated by the system. Read-only. Null for lists. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#metadata
     */
    readonly creationTimestamp?: Time;
    /**
     * Number of seconds allowed for this object to gracefully terminate before it will be removed from the system. Only set when deletionTimestamp is also set. May only be shortened. Read-only.
     */
    readonly deletionGracePeriodSeconds?: number;
    /**
     * DeletionTimestamp is RFC 3339 date and time at which this resource will be deleted. This field is set by the server when a graceful deletion is requested by the user, and is not directly settable by a client. The resource is expected to be deleted (no longer visible from resource lists, and not reachable by name) after the time in this field, once the finalizers list is empty. As long as the finalizers list contains items, deletion is blocked. Once the deletionTimestamp is set, this value may not be unset or be set further into the future, although it may be shortened or the resource may be deleted prior to this time. For example, a user may request that a pod is deleted in 30 seconds. The Kubelet will react by sending a graceful termination signal to the containers in the pod. After that 30 seconds, the Kubelet will send a hard termination signal (SIGKILL) to the container and after cleanup, remove the pod from the API. In the presence of network partitions, this object may still exist after this timestamp, until an administrator or automated process can determine the resource is fully terminated. If not set, graceful deletion of the object has not been requested.
  
  Populated by the system when a graceful deletion is requested. Read-only. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#metadata
     */
    readonly deletionTimestamp?: Time;
    /**
     * Must be empty before the object is deleted from the registry. Each entry is an identifier for the responsible component that will remove the entry from the list. If the deletionTimestamp of the object is non-nil, entries in this list can only be removed.
     */
    readonly finalizers?: string[];
    /**
     * GenerateName is an optional prefix, used by the server, to generate a unique name ONLY IF the Name field has not been provided. If this field is used, the name returned to the client will be different than the name passed. This value will also be combined with a unique suffix. The provided value has the same validation rules as the Name field, and may be truncated by the length of the suffix required to make the value unique on the server.
  
  If this field is specified and the generated name exists, the server will NOT return a 409 - instead, it will either return 201 Created or 500 with Reason ServerTimeout indicating a unique name could not be found in the time allotted, and the client should retry (optionally after the time indicated in the Retry-After header).
  
  Applied only if Name is not specified. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#idempotency
     */
    readonly generateName?: string;
    /**
     * A sequence number representing a specific generation of the desired state. Populated by the system. Read-only.
     */
    readonly generation?: number;
    /**
     * An initializer is a controller which enforces some system invariant at object creation time. This field is a list of initializers that have not yet acted on this object. If nil or empty, this object has been completely initialized. Otherwise, the object is considered uninitialized and is hidden (in list/watch and get calls) from clients that haven't explicitly asked to observe uninitialized objects.
  
  When an object is created, the system will populate this list with the current set of initializers. Only privileged users may set or modify this list. Once it is empty, it may not be modified further by any user.
  
  DEPRECATED - initializers are an alpha field and will be removed in v1.15.
     */
    readonly initializers?: Initializers;
    /**
     * Map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and services. More info: http://kubernetes.io/docs/user-guide/labels
     */
    readonly labels?: {
        [key: string]: string;
    };
    /**
     * ManagedFields maps workflow-id and version to the set of fields that are managed by that workflow. This is mostly for internal housekeeping, and users typically shouldn't need to set or understand this field. A workflow can be the user's name, a controller's name, or the name of a specific apply path like "ci-cd". The set of fields is always in the version that the workflow used when modifying the object.
  
  This field is alpha and can be changed or removed without notice.
     */
    readonly managedFields?: ManagedFieldsEntry[];
    /**
     * Name must be unique within a namespace. Is required when creating resources, although some resources may allow a client to request the generation of an appropriate name automatically. Name is primarily intended for creation idempotence and configuration definition. Cannot be updated. More info: http://kubernetes.io/docs/user-guide/identifiers#names
     */
    readonly name?: string;
    /**
     * Namespace defines the space within each name must be unique. An empty namespace is equivalent to the "default" namespace, but "default" is the canonical representation. Not all objects are required to be scoped to a namespace - the value of this field for those objects will be empty.
  
  Must be a DNS_LABEL. Cannot be updated. More info: http://kubernetes.io/docs/user-guide/namespaces
     */
    readonly namespace?: string;
    /**
     * List of objects depended by this object. If ALL objects in the list have been deleted, this object will be garbage collected. If this object is managed by a controller, then an entry in this list will point to this controller, with the controller field set to true. There cannot be more than one managing controller.
     */
    readonly ownerReferences?: OwnerReference[];
    /**
     * An opaque value that represents the internal version of this object that can be used by clients to determine when objects have changed. May be used for optimistic concurrency, change detection, and the watch operation on a resource or set of resources. Clients must treat these values as opaque and passed unmodified back to the server. They may only be valid for a particular resource or set of resources.
  
  Populated by the system. Read-only. Value must be treated as opaque by clients and . More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#concurrency-control-and-consistency
     */
    readonly resourceVersion?: string;
    /**
     * SelfLink is a URL representing this object. Populated by the system. Read-only.
     */
    readonly selfLink?: string;
    /**
     * UID is the unique in time and space value for this object. It is typically generated by the server on successful creation of a resource and is not allowed to change on PUT operations.
  
  Populated by the system. Read-only. More info: http://kubernetes.io/docs/user-guide/identifiers#uids
     */
    readonly uid?: string;
}
/**
 * DeploymentSpec is the specification of the desired behavior of the Deployment.
 */
export interface DeploymentSpec {
    /**
     * Minimum number of seconds for which a newly created pod should be ready without any of its container crashing, for it to be considered available. Defaults to 0 (pod will be considered available as soon as it is ready)
     * @default 0 (pod will be considered available as soon as it is ready)
     */
    readonly minReadySeconds?: number;
    /**
     * Indicates that the deployment is paused.
     */
    readonly paused?: boolean;
    /**
     * The maximum time in seconds for a deployment to make progress before it is considered to be failed. The deployment controller will continue to process failed deployments and a condition with a ProgressDeadlineExceeded reason will be surfaced in the deployment status. Note that progress will not be estimated during the time a deployment is paused. Defaults to 600s.
     * @default 600s.
     */
    readonly progressDeadlineSeconds?: number;
    /**
     * Number of desired pods. This is a pointer to distinguish between explicit zero and not specified. Defaults to 1.
     * @default 1.
     */
    readonly replicas?: number;
    /**
     * The number of old ReplicaSets to retain to allow rollback. This is a pointer to distinguish between explicit zero and not specified. Defaults to 10.
     * @default 10.
     */
    readonly revisionHistoryLimit?: number;
    /**
     * Label selector for pods. Existing ReplicaSets whose pods are selected by this will be the ones affected by this deployment. It must match the pod template's labels.
     */
    readonly selector?: LabelSelector;
    /**
     * The deployment strategy to use to replace existing pods with new ones.
     */
    readonly strategy?: DeploymentStrategy;
    /**
     * Template describes the pods that will be created.
     */
    readonly template?: PodTemplateSpec;
}
/**
 * Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.
 */
export declare type Time = Date;
/**
 * Initializers tracks the progress of initialization.
 */
export interface Initializers {
    /**
     * Pending is a list of initializers that must execute in order before this object is visible. When the last pending initializer is removed, and no failing result is set, the initializers struct will be set to nil and the object is considered as initialized and visible to all clients.
     */
    readonly pending?: Initializer[];
    /**
     * If result is set with the Failure field, the object will be persisted to storage and then deleted, ensuring that other clients can observe the deletion.
     */
    readonly result?: Status;
}
/**
 * ManagedFieldsEntry is a workflow-id, a FieldSet and the group version of the resource that the fieldset applies to.
 */
export interface ManagedFieldsEntry {
    /**
     * APIVersion defines the version of this resource that this field set applies to. The format is "group/version" just like the top-level APIVersion field. It is necessary to track the version of a field set because it cannot be automatically converted.
     */
    readonly apiVersion?: string;
    /**
     * Fields identifies a set of fields.
     */
    readonly fields?: Fields;
    /**
     * Manager is an identifier of the workflow managing these fields.
     */
    readonly manager?: string;
    /**
     * Operation is the type of operation which lead to this ManagedFieldsEntry being created. The only valid values for this field are 'Apply' and 'Update'.
     */
    readonly operation?: string;
    /**
     * Time is timestamp of when these fields were set. It should always be empty if Operation is 'Apply'
     */
    readonly time?: Time;
}
/**
 * OwnerReference contains enough information to let you identify an owning object. An owning object must be in the same namespace as the dependent, or be cluster-scoped, so there is no namespace field.
 */
export interface OwnerReference {
    /**
     * API version of the referent.
     */
    readonly apiVersion?: string;
    /**
     * If true, AND if the owner has the "foregroundDeletion" finalizer, then the owner cannot be deleted from the key-value store until this reference is removed. Defaults to false. To set this field, a user needs "delete" permission of the owner, otherwise 422 (Unprocessable Entity) will be returned.
     * @default false. To set this field, a user needs "delete" permission of the owner, otherwise 422 (Unprocessable Entity) will be returned.
     */
    readonly blockOwnerDeletion?: boolean;
    /**
     * If true, this reference points to the managing controller.
     */
    readonly controller?: boolean;
    /**
     * Kind of the referent. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
     */
    readonly kind?: string;
    /**
     * Name of the referent. More info: http://kubernetes.io/docs/user-guide/identifiers#names
     */
    readonly name?: string;
    /**
     * UID of the referent. More info: http://kubernetes.io/docs/user-guide/identifiers#uids
     */
    readonly uid?: string;
}
/**
 * A label selector is a label query over a set of resources. The result of matchLabels and matchExpressions are ANDed. An empty label selector matches all objects. A null label selector matches no objects.
 */
export interface LabelSelector {
    /**
     * matchExpressions is a list of label selector requirements. The requirements are ANDed.
     */
    readonly matchExpressions?: LabelSelectorRequirement[];
    /**
     * matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed.
     */
    readonly matchLabels?: {
        [key: string]: string;
    };
}
/**
 * DeploymentStrategy describes how to replace existing pods with new ones.
 */
export interface DeploymentStrategy {
    /**
     * Rolling update config params. Present only if DeploymentStrategyType = RollingUpdate.
     */
    readonly rollingUpdate?: RollingUpdateDeployment;
    /**
     * Type of deployment. Can be "Recreate" or "RollingUpdate". Default is RollingUpdate.
     * @default RollingUpdate.
     */
    readonly type?: string;
}
/**
 * PodTemplateSpec describes the data a pod should have when created from a template
 */
export interface PodTemplateSpec {
    /**
     * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#metadata
     */
    readonly metadata?: ObjectMeta;
    /**
     * Specification of the desired behavior of the pod. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#spec-and-status
     */
    readonly spec?: PodSpec;
}
/**
 * Initializer is information about an initializer that has not yet completed.
 */
export interface Initializer {
    /**
     * name of the process that is responsible for initializing this object.
     */
    readonly name?: string;
}
/**
 * Status is a return value for calls that don't return other objects.
 */
export interface Status {
    /**
     * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
     */
    readonly apiVersion?: string;
    /**
     * Suggested HTTP return code for this status, 0 if not set.
     */
    readonly code?: number;
    /**
     * Extended data associated with the reason.  Each reason may define its own extended details. This field is optional and the data returned is not guaranteed to conform to any schema except that defined by the reason type.
     */
    readonly details?: StatusDetails;
    /**
     * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
     */
    readonly kind?: string;
    /**
     * A human-readable description of the status of this operation.
     */
    readonly message?: string;
    /**
     * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
     */
    readonly metadata?: ListMeta;
    /**
     * A machine-readable description of why this operation is in the "Failure" status. If this value is empty there is no information available. A Reason clarifies an HTTP status code but does not override it.
     */
    readonly reason?: string;
    /**
     * Status of the operation. One of: "Success" or "Failure". More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#spec-and-status
     */
    readonly status?: string;
}
/**
 * Fields stores a set of fields in a data structure like a Trie. To understand how this is used, see: https://github.com/kubernetes-sigs/structured-merge-diff
 */
export declare type Fields = "unknown [object Object]";
/**
 * A label selector requirement is a selector that contains values, a key, and an operator that relates the key and values.
 */
export interface LabelSelectorRequirement {
    /**
     * key is the label key that the selector applies to.
     */
    readonly key?: string;
    /**
     * operator represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists and DoesNotExist.
     */
    readonly operator?: string;
    /**
     * values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.
     */
    readonly values?: string[];
}
/**
 * Spec to control the desired behavior of rolling update.
 */
export interface RollingUpdateDeployment {
    /**
     * The maximum number of pods that can be scheduled above the desired number of pods. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). This can not be 0 if MaxUnavailable is 0. Absolute number is calculated from percentage by rounding up. Defaults to 25%. Example: when this is set to 30%, the new ReplicaSet can be scaled up immediately when the rolling update starts, such that the total number of old and new pods do not exceed 130% of desired pods. Once old pods have been killed, new ReplicaSet can be scaled up further, ensuring that total number of pods running at any time during the update is at most 130% of desired pods.
     * @default 25%. Example: when this is set to 30%, the new ReplicaSet can be scaled up immediately when the rolling update starts, such that the total number of old and new pods do not exceed 130% of desired pods. Once old pods have been killed, new ReplicaSet can be scaled up further, ensuring that total number of pods running at any time during the update is at most 130% of desired pods.
     */
    readonly maxSurge?: IntOrString;
    /**
     * The maximum number of pods that can be unavailable during the update. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). Absolute number is calculated from percentage by rounding down. This can not be 0 if MaxSurge is 0. Defaults to 25%. Example: when this is set to 30%, the old ReplicaSet can be scaled down to 70% of desired pods immediately when the rolling update starts. Once new pods are ready, old ReplicaSet can be scaled down further, followed by scaling up the new ReplicaSet, ensuring that the total number of pods available at all times during the update is at least 70% of desired pods.
     * @default 25%. Example: when this is set to 30%, the old ReplicaSet can be scaled down to 70% of desired pods immediately when the rolling update starts. Once new pods are ready, old ReplicaSet can be scaled down further, followed by scaling up the new ReplicaSet, ensuring that the total number of pods available at all times during the update is at least 70% of desired pods.
     */
    readonly maxUnavailable?: IntOrString;
}
/**
 * PodSpec is a description of a pod.
 */
export interface PodSpec {
    /**
     * Optional duration in seconds the pod may be active on the node relative to StartTime before the system will actively try to mark it failed and kill associated containers. Value must be a positive integer.
     */
    readonly activeDeadlineSeconds?: number;
    /**
     * If specified, the pod's scheduling constraints
     */
    readonly affinity?: Affinity;
    /**
     * AutomountServiceAccountToken indicates whether a service account token should be automatically mounted.
     */
    readonly automountServiceAccountToken?: boolean;
    /**
     * List of containers belonging to the pod. Containers cannot currently be added or removed. There must be at least one container in a Pod. Cannot be updated.
     */
    readonly containers?: Container[];
    /**
     * Specifies the DNS parameters of a pod. Parameters specified here will be merged to the generated DNS configuration based on DNSPolicy.
     */
    readonly dnsConfig?: PodDNSConfig;
    /**
     * Set DNS policy for the pod. Defaults to "ClusterFirst". Valid values are 'ClusterFirstWithHostNet', 'ClusterFirst', 'Default' or 'None'. DNS parameters given in DNSConfig will be merged with the policy selected with DNSPolicy. To have DNS options set along with hostNetwork, you have to specify DNS policy explicitly to 'ClusterFirstWithHostNet'.
     * @default ClusterFirst". Valid values are 'ClusterFirstWithHostNet', 'ClusterFirst', 'Default' or 'None'. DNS parameters given in DNSConfig will be merged with the policy selected with DNSPolicy. To have DNS options set along with hostNetwork, you have to specify DNS policy explicitly to 'ClusterFirstWithHostNet'.
     */
    readonly dnsPolicy?: string;
    /**
     * EnableServiceLinks indicates whether information about services should be injected into pod's environment variables, matching the syntax of Docker links. Optional: Defaults to true.
     * @default true.
     */
    readonly enableServiceLinks?: boolean;
    /**
     * HostAliases is an optional list of hosts and IPs that will be injected into the pod's hosts file if specified. This is only valid for non-hostNetwork pods.
     */
    readonly hostAliases?: HostAlias[];
    /**
     * Use the host's ipc namespace. Optional: Default to false.
     * @default false.
     */
    readonly hostIPC?: boolean;
    /**
     * Host networking requested for this pod. Use the host's network namespace. If this option is set, the ports that will be used must be specified. Default to false.
     * @default false.
     */
    readonly hostNetwork?: boolean;
    /**
     * Use the host's pid namespace. Optional: Default to false.
     * @default false.
     */
    readonly hostPID?: boolean;
    /**
     * Specifies the hostname of the Pod If not specified, the pod's hostname will be set to a system-defined value.
     */
    readonly hostname?: string;
    /**
     * ImagePullSecrets is an optional list of references to secrets in the same namespace to use for pulling any of the images used by this PodSpec. If specified, these secrets will be passed to individual puller implementations for them to use. For example, in the case of docker, only DockerConfig type secrets are honored. More info: https://kubernetes.io/docs/concepts/containers/images#specifying-imagepullsecrets-on-a-pod
     */
    readonly imagePullSecrets?: LocalObjectReference[];
    /**
     * List of initialization containers belonging to the pod. Init containers are executed in order prior to containers being started. If any init container fails, the pod is considered to have failed and is handled according to its restartPolicy. The name for an init container or normal container must be unique among all containers. Init containers may not have Lifecycle actions, Readiness probes, or Liveness probes. The resourceRequirements of an init container are taken into account during scheduling by finding the highest request/limit for each resource type, and then using the max of of that value or the sum of the normal containers. Limits are applied to init containers in a similar fashion. Init containers cannot currently be added or removed. Cannot be updated. More info: https://kubernetes.io/docs/concepts/workloads/pods/init-containers/
     */
    readonly initContainers?: Container[];
    /**
     * NodeName is a request to schedule this pod onto a specific node. If it is non-empty, the scheduler simply schedules this pod onto that node, assuming that it fits resource requirements.
     */
    readonly nodeName?: string;
    /**
     * NodeSelector is a selector which must be true for the pod to fit on a node. Selector which must match a node's labels for the pod to be scheduled on that node. More info: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
     */
    readonly nodeSelector?: {
        [key: string]: string;
    };
    /**
     * The priority value. Various system components use this field to find the priority of the pod. When Priority Admission Controller is enabled, it prevents users from setting this field. The admission controller populates this field from PriorityClassName. The higher the value, the higher the priority.
     */
    readonly priority?: number;
    /**
     * If specified, indicates the pod's priority. "system-node-critical" and "system-cluster-critical" are two special keywords which indicate the highest priorities with the former being the highest priority. Any other name must be defined by creating a PriorityClass object with that name. If not specified, the pod priority will be default or zero if there is no default.
     */
    readonly priorityClassName?: string;
    /**
     * If specified, all readiness gates will be evaluated for pod readiness. A pod is ready when all its containers are ready AND all conditions specified in the readiness gates have status equal to "True" More info: https://git.k8s.io/enhancements/keps/sig-network/0007-pod-ready%2B%2B.md
     */
    readonly readinessGates?: PodReadinessGate[];
    /**
     * Restart policy for all containers within the pod. One of Always, OnFailure, Never. Default to Always. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#restart-policy
     * @default Always. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#restart-policy
     */
    readonly restartPolicy?: string;
    /**
     * RuntimeClassName refers to a RuntimeClass object in the node.k8s.io group, which should be used to run this pod.  If no RuntimeClass resource matches the named class, the pod will not be run. If unset or empty, the "legacy" RuntimeClass will be used, which is an implicit class with an empty definition that uses the default runtime handler. More info: https://git.k8s.io/enhancements/keps/sig-node/runtime-class.md This is an alpha feature and may change in the future.
     */
    readonly runtimeClassName?: string;
    /**
     * If specified, the pod will be dispatched by specified scheduler. If not specified, the pod will be dispatched by default scheduler.
     */
    readonly schedulerName?: string;
    /**
     * SecurityContext holds pod-level security attributes and common container settings. Optional: Defaults to empty.  See type description for default values of each field.
     * @default empty.  See type description for default values of each field.
     */
    readonly securityContext?: PodSecurityContext;
    /**
     * DeprecatedServiceAccount is a depreciated alias for ServiceAccountName. Deprecated: Use serviceAccountName instead.
     */
    readonly serviceAccount?: string;
    /**
     * ServiceAccountName is the name of the ServiceAccount to use to run this pod. More info: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/
     */
    readonly serviceAccountName?: string;
    /**
     * Share a single process namespace between all of the containers in a pod. When this is set containers will be able to view and signal processes from other containers in the same pod, and the first process in each container will not be assigned PID 1. HostPID and ShareProcessNamespace cannot both be set. Optional: Default to false. This field is beta-level and may be disabled with the PodShareProcessNamespace feature.
     * @default false. This field is beta-level and may be disabled with the PodShareProcessNamespace feature.
     */
    readonly shareProcessNamespace?: boolean;
    /**
     * If specified, the fully qualified Pod hostname will be "<hostname>.<subdomain>.<pod namespace>.svc.<cluster domain>". If not specified, the pod will not have a domainname at all.
     */
    readonly subdomain?: string;
    /**
     * Optional duration in seconds the pod needs to terminate gracefully. May be decreased in delete request. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period will be used instead. The grace period is the duration in seconds after the processes running in the pod are sent a termination signal and the time when the processes are forcibly halted with a kill signal. Set this value longer than the expected cleanup time for your process. Defaults to 30 seconds.
     * @default 30 seconds.
     */
    readonly terminationGracePeriodSeconds?: number;
    /**
     * If specified, the pod's tolerations.
     */
    readonly tolerations?: Toleration[];
    /**
     * List of volumes that can be mounted by containers belonging to the pod. More info: https://kubernetes.io/docs/concepts/storage/volumes
     */
    readonly volumes?: Volume[];
}
/**
 * StatusDetails is a set of additional properties that MAY be set by the server to provide additional information about a response. The Reason field of a Status object defines what attributes will be set. Clients must ignore fields that do not match the defined type of each attribute, and should assume that any attribute may be empty, invalid, or under defined.
 */
export interface StatusDetails {
    /**
     * The Causes array includes more details associated with the StatusReason failure. Not all StatusReasons may provide detailed causes.
     */
    readonly causes?: StatusCause[];
    /**
     * The group attribute of the resource associated with the status StatusReason.
     */
    readonly group?: string;
    /**
     * The kind attribute of the resource associated with the status StatusReason. On some operations may differ from the requested resource Kind. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
     */
    readonly kind?: string;
    /**
     * The name attribute of the resource associated with the status StatusReason (when there is a single name which can be described).
     */
    readonly name?: string;
    /**
     * If specified, the time in seconds before the operation should be retried. Some errors may indicate the client must take an alternate action - for those errors this field may indicate how long to wait before taking the alternate action.
     */
    readonly retryAfterSeconds?: number;
    /**
     * UID of the resource. (when there is a single resource which can be described). More info: http://kubernetes.io/docs/user-guide/identifiers#uids
     */
    readonly uid?: string;
}
/**
 * ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
 */
export interface ListMeta {
    /**
     * continue may be set if the user set a limit on the number of items returned, and indicates that the server has more data available. The value is opaque and may be used to issue another request to the endpoint that served this list to retrieve the next set of available objects. Continuing a consistent list may not be possible if the server configuration has changed or more than a few minutes have passed. The resourceVersion field returned when using this continue value will be identical to the value in the first response, unless you have received this token from an error message.
     */
    readonly continue?: string;
    /**
     * String that identifies the server's internal version of this object that can be used by clients to determine when objects have changed. Value must be treated as opaque by clients and passed unmodified back to the server. Populated by the system. Read-only. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#concurrency-control-and-consistency
     */
    readonly resourceVersion?: string;
    /**
     * selfLink is a URL representing this object. Populated by the system. Read-only.
     */
    readonly selfLink?: string;
}
export declare class IntOrString {
    static fromString(value: string): IntOrString;
    static fromNumber(value: number): IntOrString;
    private constructor();
}
/**
 * Affinity is a group of affinity scheduling rules.
 */
export interface Affinity {
    /**
     * Describes node affinity scheduling rules for the pod.
     */
    readonly nodeAffinity?: NodeAffinity;
    /**
     * Describes pod affinity scheduling rules (e.g. co-locate this pod in the same node, zone, etc. as some other pod(s)).
     */
    readonly podAffinity?: PodAffinity;
    /**
     * Describes pod anti-affinity scheduling rules (e.g. avoid putting this pod in the same node, zone, etc. as some other pod(s)).
     */
    readonly podAntiAffinity?: PodAntiAffinity;
}
/**
 * A single application container that you want to run within a pod.
 */
export interface Container {
    /**
     * Arguments to the entrypoint. The docker image's CMD is used if this is not provided. Variable references $(VAR_NAME) are expanded using the container's environment. If a variable cannot be resolved, the reference in the input string will be unchanged. The $(VAR_NAME) syntax can be escaped with a double $$, ie: $$(VAR_NAME). Escaped references will never be expanded, regardless of whether the variable exists or not. Cannot be updated. More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
     */
    readonly args?: string[];
    /**
     * Entrypoint array. Not executed within a shell. The docker image's ENTRYPOINT is used if this is not provided. Variable references $(VAR_NAME) are expanded using the container's environment. If a variable cannot be resolved, the reference in the input string will be unchanged. The $(VAR_NAME) syntax can be escaped with a double $$, ie: $$(VAR_NAME). Escaped references will never be expanded, regardless of whether the variable exists or not. Cannot be updated. More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
     */
    readonly command?: string[];
    /**
     * List of environment variables to set in the container. Cannot be updated.
     */
    readonly env?: EnvVar[];
    /**
     * List of sources to populate environment variables in the container. The keys defined within a source must be a C_IDENTIFIER. All invalid keys will be reported as an event when the container is starting. When a key exists in multiple sources, the value associated with the last source will take precedence. Values defined by an Env with a duplicate key will take precedence. Cannot be updated.
     */
    readonly envFrom?: EnvFromSource[];
    /**
     * Docker image name. More info: https://kubernetes.io/docs/concepts/containers/images This field is optional to allow higher level config management to default or override container images in workload controllers like Deployments and StatefulSets.
     */
    readonly image?: string;
    /**
     * Image pull policy. One of Always, Never, IfNotPresent. Defaults to Always if :latest tag is specified, or IfNotPresent otherwise. Cannot be updated. More info: https://kubernetes.io/docs/concepts/containers/images#updating-images
     * @default Always if :latest tag is specified, or IfNotPresent otherwise. Cannot be updated. More info: https://kubernetes.io/docs/concepts/containers/images#updating-images
     */
    readonly imagePullPolicy?: string;
    /**
     * Actions that the management system should take in response to container lifecycle events. Cannot be updated.
     */
    readonly lifecycle?: Lifecycle;
    /**
     * Periodic probe of container liveness. Container will be restarted if the probe fails. Cannot be updated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     */
    readonly livenessProbe?: Probe;
    /**
     * Name of the container specified as a DNS_LABEL. Each container in a pod must have a unique name (DNS_LABEL). Cannot be updated.
     */
    readonly name?: string;
    /**
     * List of ports to expose from the container. Exposing a port here gives the system additional information about the network connections a container uses, but is primarily informational. Not specifying a port here DOES NOT prevent that port from being exposed. Any port which is listening on the default "0.0.0.0" address inside a container will be accessible from the network. Cannot be updated.
     */
    readonly ports?: ContainerPort[];
    /**
     * Periodic probe of container service readiness. Container will be removed from service endpoints if the probe fails. Cannot be updated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     */
    readonly readinessProbe?: Probe;
    /**
     * Compute Resources required by this container. Cannot be updated. More info: https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/
     */
    readonly resources?: ResourceRequirements;
    /**
     * Security options the pod should run with. More info: https://kubernetes.io/docs/concepts/policy/security-context/ More info: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
     */
    readonly securityContext?: SecurityContext;
    /**
     * Whether this container should allocate a buffer for stdin in the container runtime. If this is not set, reads from stdin in the container will always result in EOF. Default is false.
     * @default false.
     */
    readonly stdin?: boolean;
    /**
     * Whether the container runtime should close the stdin channel after it has been opened by a single attach. When stdin is true the stdin stream will remain open across multiple attach sessions. If stdinOnce is set to true, stdin is opened on container start, is empty until the first client attaches to stdin, and then remains open and accepts data until the client disconnects, at which time stdin is closed and remains closed until the container is restarted. If this flag is false, a container processes that reads from stdin will never receive an EOF. Default is false
     * @default false
     */
    readonly stdinOnce?: boolean;
    /**
     * Optional: Path at which the file to which the container's termination message will be written is mounted into the container's filesystem. Message written is intended to be brief final status, such as an assertion failure message. Will be truncated by the node if greater than 4096 bytes. The total message length across all containers will be limited to 12kb. Defaults to /dev/termination-log. Cannot be updated.
     * @default dev/termination-log. Cannot be updated.
     */
    readonly terminationMessagePath?: string;
    /**
     * Indicate how the termination message should be populated. File will use the contents of terminationMessagePath to populate the container status message on both success and failure. FallbackToLogsOnError will use the last chunk of container log output if the termination message file is empty and the container exited with an error. The log output is limited to 2048 bytes or 80 lines, whichever is smaller. Defaults to File. Cannot be updated.
     * @default File. Cannot be updated.
     */
    readonly terminationMessagePolicy?: string;
    /**
     * Whether this container should allocate a TTY for itself, also requires 'stdin' to be true. Default is false.
     * @default false.
     */
    readonly tty?: boolean;
    /**
     * volumeDevices is the list of block devices to be used by the container. This is a beta feature.
     */
    readonly volumeDevices?: VolumeDevice[];
    /**
     * Pod volumes to mount into the container's filesystem. Cannot be updated.
     */
    readonly volumeMounts?: VolumeMount[];
    /**
     * Container's working directory. If not specified, the container runtime's default will be used, which might be configured in the container image. Cannot be updated.
     */
    readonly workingDir?: string;
}
/**
 * PodDNSConfig defines the DNS parameters of a pod in addition to those generated from DNSPolicy.
 */
export interface PodDNSConfig {
    /**
     * A list of DNS name server IP addresses. This will be appended to the base nameservers generated from DNSPolicy. Duplicated nameservers will be removed.
     */
    readonly nameservers?: string[];
    /**
     * A list of DNS resolver options. This will be merged with the base options generated from DNSPolicy. Duplicated entries will be removed. Resolution options given in Options will override those that appear in the base DNSPolicy.
     */
    readonly options?: PodDNSConfigOption[];
    /**
     * A list of DNS search domains for host-name lookup. This will be appended to the base search paths generated from DNSPolicy. Duplicated search paths will be removed.
     */
    readonly searches?: string[];
}
/**
 * HostAlias holds the mapping between IP and hostnames that will be injected as an entry in the pod's hosts file.
 */
export interface HostAlias {
    /**
     * Hostnames for the above IP address.
     */
    readonly hostnames?: string[];
    /**
     * IP address of the host file entry.
     */
    readonly ip?: string;
}
/**
 * LocalObjectReference contains enough information to let you locate the referenced object inside the same namespace.
 */
export interface LocalObjectReference {
    /**
     * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     */
    readonly name?: string;
}
/**
 * PodReadinessGate contains the reference to a pod condition
 */
export interface PodReadinessGate {
    /**
     * ConditionType refers to a condition in the pod's condition list with matching type.
     */
    readonly conditionType?: string;
}
/**
 * PodSecurityContext holds pod-level security attributes and common container settings. Some fields are also present in container.securityContext.  Field values of container.securityContext take precedence over field values of PodSecurityContext.
 */
export interface PodSecurityContext {
    /**
     * A special supplemental group that applies to all containers in a pod. Some volume types allow the Kubelet to change the ownership of that volume to be owned by the pod:
  
  1. The owning GID will be the FSGroup 2. The setgid bit is set (new files created in the volume will be owned by FSGroup) 3. The permission bits are OR'd with rw-rw----
  
  If unset, the Kubelet will not modify the ownership and permissions of any volume.
     */
    readonly fsGroup?: number;
    /**
     * The GID to run the entrypoint of the container process. Uses runtime default if unset. May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence for that container.
     */
    readonly runAsGroup?: number;
    /**
     * Indicates that the container must run as a non-root user. If true, the Kubelet will validate the image at runtime to ensure that it does not run as UID 0 (root) and fail to start the container if it does. If unset or false, no such validation will be performed. May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.
     */
    readonly runAsNonRoot?: boolean;
    /**
     * The UID to run the entrypoint of the container process. Defaults to user specified in image metadata if unspecified. May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence for that container.
     * @default user specified in image metadata if unspecified. May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence for that container.
     */
    readonly runAsUser?: number;
    /**
     * The SELinux context to be applied to all containers. If unspecified, the container runtime will allocate a random SELinux context for each container.  May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence for that container.
     */
    readonly seLinuxOptions?: SELinuxOptions;
    /**
     * A list of groups applied to the first process run in each container, in addition to the container's primary GID.  If unspecified, no groups will be added to any container.
     */
    readonly supplementalGroups?: number[];
    /**
     * Sysctls hold a list of namespaced sysctls used for the pod. Pods with unsupported sysctls (by the container runtime) might fail to launch.
     */
    readonly sysctls?: Sysctl[];
}
/**
 * The pod this Toleration is attached to tolerates any taint that matches the triple <key,value,effect> using the matching operator <operator>.
 */
export interface Toleration {
    /**
     * Effect indicates the taint effect to match. Empty means match all taint effects. When specified, allowed values are NoSchedule, PreferNoSchedule and NoExecute.
     */
    readonly effect?: string;
    /**
     * Key is the taint key that the toleration applies to. Empty means match all taint keys. If the key is empty, operator must be Exists; this combination means to match all values and all keys.
     */
    readonly key?: string;
    /**
     * Operator represents a key's relationship to the value. Valid operators are Exists and Equal. Defaults to Equal. Exists is equivalent to wildcard for value, so that a pod can tolerate all taints of a particular category.
     * @default Equal. Exists is equivalent to wildcard for value, so that a pod can tolerate all taints of a particular category.
     */
    readonly operator?: string;
    /**
     * TolerationSeconds represents the period of time the toleration (which must be of effect NoExecute, otherwise this field is ignored) tolerates the taint. By default, it is not set, which means tolerate the taint forever (do not evict). Zero and negative values will be treated as 0 (evict immediately) by the system.
     */
    readonly tolerationSeconds?: number;
    /**
     * Value is the taint value the toleration matches to. If the operator is Exists, the value should be empty, otherwise just a regular string.
     */
    readonly value?: string;
}
/**
 * Volume represents a named volume in a pod that may be accessed by any container in the pod.
 */
export interface Volume {
    /**
     * AWSElasticBlockStore represents an AWS Disk resource that is attached to a kubelet's host machine and then exposed to the pod. More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
     */
    readonly awsElasticBlockStore?: AWSElasticBlockStoreVolumeSource;
    /**
     * AzureDisk represents an Azure Data Disk mount on the host and bind mount to the pod.
     */
    readonly azureDisk?: AzureDiskVolumeSource;
    /**
     * AzureFile represents an Azure File Service mount on the host and bind mount to the pod.
     */
    readonly azureFile?: AzureFileVolumeSource;
    /**
     * CephFS represents a Ceph FS mount on the host that shares a pod's lifetime
     */
    readonly cephfs?: CephFSVolumeSource;
    /**
     * Cinder represents a cinder volume attached and mounted on kubelets host machine More info: https://releases.k8s.io/HEAD/examples/mysql-cinder-pd/README.md
     */
    readonly cinder?: CinderVolumeSource;
    /**
     * ConfigMap represents a configMap that should populate this volume
     */
    readonly configMap?: ConfigMapVolumeSource;
    /**
     * CSI (Container Storage Interface) represents storage that is handled by an external CSI driver (Alpha feature).
     */
    readonly csi?: CSIVolumeSource;
    /**
     * DownwardAPI represents downward API about the pod that should populate this volume
     */
    readonly downwardAPI?: DownwardAPIVolumeSource;
    /**
     * EmptyDir represents a temporary directory that shares a pod's lifetime. More info: https://kubernetes.io/docs/concepts/storage/volumes#emptydir
     */
    readonly emptyDir?: EmptyDirVolumeSource;
    /**
     * FC represents a Fibre Channel resource that is attached to a kubelet's host machine and then exposed to the pod.
     */
    readonly fc?: FCVolumeSource;
    /**
     * FlexVolume represents a generic volume resource that is provisioned/attached using an exec based plugin.
     */
    readonly flexVolume?: FlexVolumeSource;
    /**
     * Flocker represents a Flocker volume attached to a kubelet's host machine. This depends on the Flocker control service being running
     */
    readonly flocker?: FlockerVolumeSource;
    /**
     * GCEPersistentDisk represents a GCE Disk resource that is attached to a kubelet's host machine and then exposed to the pod. More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
     */
    readonly gcePersistentDisk?: GCEPersistentDiskVolumeSource;
    /**
     * GitRepo represents a git repository at a particular revision. DEPRECATED: GitRepo is deprecated. To provision a container with a git repo, mount an EmptyDir into an InitContainer that clones the repo using git, then mount the EmptyDir into the Pod's container.
     */
    readonly gitRepo?: GitRepoVolumeSource;
    /**
     * Glusterfs represents a Glusterfs mount on the host that shares a pod's lifetime. More info: https://releases.k8s.io/HEAD/examples/volumes/glusterfs/README.md
     */
    readonly glusterfs?: GlusterfsVolumeSource;
    /**
     * HostPath represents a pre-existing file or directory on the host machine that is directly exposed to the container. This is generally used for system agents or other privileged things that are allowed to see the host machine. Most containers will NOT need this. More info: https://kubernetes.io/docs/concepts/storage/volumes#hostpath
     */
    readonly hostPath?: HostPathVolumeSource;
    /**
     * ISCSI represents an ISCSI Disk resource that is attached to a kubelet's host machine and then exposed to the pod. More info: https://releases.k8s.io/HEAD/examples/volumes/iscsi/README.md
     */
    readonly iscsi?: ISCSIVolumeSource;
    /**
     * Volume's name. Must be a DNS_LABEL and unique within the pod. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     */
    readonly name?: string;
    /**
     * NFS represents an NFS mount on the host that shares a pod's lifetime More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
     */
    readonly nfs?: NFSVolumeSource;
    /**
     * PersistentVolumeClaimVolumeSource represents a reference to a PersistentVolumeClaim in the same namespace. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
     */
    readonly persistentVolumeClaim?: PersistentVolumeClaimVolumeSource;
    /**
     * PhotonPersistentDisk represents a PhotonController persistent disk attached and mounted on kubelets host machine
     */
    readonly photonPersistentDisk?: PhotonPersistentDiskVolumeSource;
    /**
     * PortworxVolume represents a portworx volume attached and mounted on kubelets host machine
     */
    readonly portworxVolume?: PortworxVolumeSource;
    /**
     * Items for all in one resources secrets, configmaps, and downward API
     */
    readonly projected?: ProjectedVolumeSource;
    /**
     * Quobyte represents a Quobyte mount on the host that shares a pod's lifetime
     */
    readonly quobyte?: QuobyteVolumeSource;
    /**
     * RBD represents a Rados Block Device mount on the host that shares a pod's lifetime. More info: https://releases.k8s.io/HEAD/examples/volumes/rbd/README.md
     */
    readonly rbd?: RBDVolumeSource;
    /**
     * ScaleIO represents a ScaleIO persistent volume attached and mounted on Kubernetes nodes.
     */
    readonly scaleIO?: ScaleIOVolumeSource;
    /**
     * Secret represents a secret that should populate this volume. More info: https://kubernetes.io/docs/concepts/storage/volumes#secret
     */
    readonly secret?: SecretVolumeSource;
    /**
     * StorageOS represents a StorageOS volume attached and mounted on Kubernetes nodes.
     */
    readonly storageos?: StorageOSVolumeSource;
    /**
     * VsphereVolume represents a vSphere volume attached and mounted on kubelets host machine
     */
    readonly vsphereVolume?: VsphereVirtualDiskVolumeSource;
}
/**
 * StatusCause provides more information about an api.Status failure, including cases when multiple errors are encountered.
 */
export interface StatusCause {
    /**
     * The field of the resource that has caused this error, as named by its JSON serialization. May include dot and postfix notation for nested attributes. Arrays are zero-indexed.  Fields may appear more than once in an array of causes due to fields having multiple errors. Optional.
  
  Examples:
    "name" - the field "name" on the current resource
    "items[0].name" - the field "name" on the first array entry in "items"
     */
    readonly field?: string;
    /**
     * A human-readable description of the cause of the error.  This field may be presented as-is to a reader.
     */
    readonly message?: string;
    /**
     * A machine-readable description of the cause of the error. If this value is empty there is no information available.
     */
    readonly reason?: string;
}
/**
 * Node affinity is a group of node affinity scheduling rules.
 */
export interface NodeAffinity {
    /**
     * The scheduler will prefer to schedule pods to nodes that satisfy the affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights, i.e. for each node that meets all of the scheduling requirements (resource request, requiredDuringScheduling affinity expressions, etc.), compute a sum by iterating through the elements of this field and adding "weight" to the sum if the node matches the corresponding matchExpressions; the node(s) with the highest sum are the most preferred.
     */
    readonly preferredDuringSchedulingIgnoredDuringExecution?: PreferredSchedulingTerm[];
    /**
     * If the affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to an update), the system may or may not try to eventually evict the pod from its node.
     */
    readonly requiredDuringSchedulingIgnoredDuringExecution?: NodeSelector;
}
/**
 * Pod affinity is a group of inter pod affinity scheduling rules.
 */
export interface PodAffinity {
    /**
     * The scheduler will prefer to schedule pods to nodes that satisfy the affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights, i.e. for each node that meets all of the scheduling requirements (resource request, requiredDuringScheduling affinity expressions, etc.), compute a sum by iterating through the elements of this field and adding "weight" to the sum if the node has pods which matches the corresponding podAffinityTerm; the node(s) with the highest sum are the most preferred.
     */
    readonly preferredDuringSchedulingIgnoredDuringExecution?: WeightedPodAffinityTerm[];
    /**
     * If the affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to a pod label update), the system may or may not try to eventually evict the pod from its node. When there are multiple elements, the lists of nodes corresponding to each podAffinityTerm are intersected, i.e. all terms must be satisfied.
     */
    readonly requiredDuringSchedulingIgnoredDuringExecution?: PodAffinityTerm[];
}
/**
 * Pod anti affinity is a group of inter pod anti affinity scheduling rules.
 */
export interface PodAntiAffinity {
    /**
     * The scheduler will prefer to schedule pods to nodes that satisfy the anti-affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights, i.e. for each node that meets all of the scheduling requirements (resource request, requiredDuringScheduling anti-affinity expressions, etc.), compute a sum by iterating through the elements of this field and adding "weight" to the sum if the node has pods which matches the corresponding podAffinityTerm; the node(s) with the highest sum are the most preferred.
     */
    readonly preferredDuringSchedulingIgnoredDuringExecution?: WeightedPodAffinityTerm[];
    /**
     * If the anti-affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the anti-affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to a pod label update), the system may or may not try to eventually evict the pod from its node. When there are multiple elements, the lists of nodes corresponding to each podAffinityTerm are intersected, i.e. all terms must be satisfied.
     */
    readonly requiredDuringSchedulingIgnoredDuringExecution?: PodAffinityTerm[];
}
/**
 * EnvVar represents an environment variable present in a Container.
 */
export interface EnvVar {
    /**
     * Name of the environment variable. Must be a C_IDENTIFIER.
     */
    readonly name?: string;
    /**
     * Variable references $(VAR_NAME) are expanded using the previous defined environment variables in the container and any service environment variables. If a variable cannot be resolved, the reference in the input string will be unchanged. The $(VAR_NAME) syntax can be escaped with a double $$, ie: $$(VAR_NAME). Escaped references will never be expanded, regardless of whether the variable exists or not. Defaults to "".
     * @default .
     */
    readonly value?: string;
    /**
     * Source for the environment variable's value. Cannot be used if value is not empty.
     */
    readonly valueFrom?: EnvVarSource;
}
/**
 * EnvFromSource represents the source of a set of ConfigMaps
 */
export interface EnvFromSource {
    /**
     * The ConfigMap to select from
     */
    readonly configMapRef?: ConfigMapEnvSource;
    /**
     * An optional identifier to prepend to each key in the ConfigMap. Must be a C_IDENTIFIER.
     */
    readonly prefix?: string;
    /**
     * The Secret to select from
     */
    readonly secretRef?: SecretEnvSource;
}
/**
 * Lifecycle describes actions that the management system should take in response to container lifecycle events. For the PostStart and PreStop lifecycle handlers, management of the container blocks until the action is complete, unless the container process fails, in which case the handler is aborted.
 */
export interface Lifecycle {
    /**
     * PostStart is called immediately after a container is created. If the handler fails, the container is terminated and restarted according to its restart policy. Other management of the container blocks until the hook completes. More info: https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/#container-hooks
     */
    readonly postStart?: Handler;
    /**
     * PreStop is called immediately before a container is terminated due to an API request or management event such as liveness probe failure, preemption, resource contention, etc. The handler is not called if the container crashes or exits. The reason for termination is passed to the handler. The Pod's termination grace period countdown begins before the PreStop hooked is executed. Regardless of the outcome of the handler, the container will eventually terminate within the Pod's termination grace period. Other management of the container blocks until the hook completes or until the termination grace period is reached. More info: https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/#container-hooks
     */
    readonly preStop?: Handler;
}
/**
 * Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.
 */
export interface Probe {
    /**
     * One and only one of the following should be specified. Exec specifies the action to take.
     */
    readonly exec?: ExecAction;
    /**
     * Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.
     * @default 3. Minimum value is 1.
     */
    readonly failureThreshold?: number;
    /**
     * HTTPGet specifies the http request to perform.
     */
    readonly httpGet?: HTTPGetAction;
    /**
     * Number of seconds after the container has started before liveness probes are initiated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     */
    readonly initialDelaySeconds?: number;
    /**
     * How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1.
     * @default 10 seconds. Minimum value is 1.
     */
    readonly periodSeconds?: number;
    /**
     * Minimum consecutive successes for the probe to be considered successful after having failed. Defaults to 1. Must be 1 for liveness. Minimum value is 1.
     * @default 1. Must be 1 for liveness. Minimum value is 1.
     */
    readonly successThreshold?: number;
    /**
     * TCPSocket specifies an action involving a TCP port. TCP hooks not yet supported
     */
    readonly tcpSocket?: TCPSocketAction;
    /**
     * Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     * @default 1 second. Minimum value is 1. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     */
    readonly timeoutSeconds?: number;
}
/**
 * ContainerPort represents a network port in a single container.
 */
export interface ContainerPort {
    /**
     * Number of port to expose on the pod's IP address. This must be a valid port number, 0 < x < 65536.
     */
    readonly containerPort?: number;
    /**
     * What host IP to bind the external port to.
     */
    readonly hostIP?: string;
    /**
     * Number of port to expose on the host. If specified, this must be a valid port number, 0 < x < 65536. If HostNetwork is specified, this must match ContainerPort. Most containers do not need this.
     */
    readonly hostPort?: number;
    /**
     * If specified, this must be an IANA_SVC_NAME and unique within the pod. Each named port in a pod must have a unique name. Name for the port that can be referred to by services.
     */
    readonly name?: string;
    /**
     * Protocol for port. Must be UDP, TCP, or SCTP. Defaults to "TCP".
     * @default TCP".
     */
    readonly protocol?: string;
}
/**
 * ResourceRequirements describes the compute resource requirements.
 */
export interface ResourceRequirements {
    /**
     * Limits describes the maximum amount of compute resources allowed. More info: https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/
     */
    readonly limits?: {
        [key: string]: Quantity;
    };
    /**
     * Requests describes the minimum amount of compute resources required. If Requests is omitted for a container, it defaults to Limits if that is explicitly specified, otherwise to an implementation-defined value. More info: https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/
     */
    readonly requests?: {
        [key: string]: Quantity;
    };
}
/**
 * SecurityContext holds security configuration that will be applied to a container. Some fields are present in both SecurityContext and PodSecurityContext.  When both are set, the values in SecurityContext take precedence.
 */
export interface SecurityContext {
    /**
     * AllowPrivilegeEscalation controls whether a process can gain more privileges than its parent process. This bool directly controls if the no_new_privs flag will be set on the container process. AllowPrivilegeEscalation is true always when the container is: 1) run as Privileged 2) has CAP_SYS_ADMIN
     */
    readonly allowPrivilegeEscalation?: boolean;
    /**
     * The capabilities to add/drop when running containers. Defaults to the default set of capabilities granted by the container runtime.
     * @default the default set of capabilities granted by the container runtime.
     */
    readonly capabilities?: Capabilities;
    /**
     * Run container in privileged mode. Processes in privileged containers are essentially equivalent to root on the host. Defaults to false.
     * @default false.
     */
    readonly privileged?: boolean;
    /**
     * procMount denotes the type of proc mount to use for the containers. The default is DefaultProcMount which uses the container runtime defaults for readonly paths and masked paths. This requires the ProcMountType feature flag to be enabled.
     */
    readonly procMount?: string;
    /**
     * Whether this container has a read-only root filesystem. Default is false.
     * @default false.
     */
    readonly readOnlyRootFilesystem?: boolean;
    /**
     * The GID to run the entrypoint of the container process. Uses runtime default if unset. May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.
     */
    readonly runAsGroup?: number;
    /**
     * Indicates that the container must run as a non-root user. If true, the Kubelet will validate the image at runtime to ensure that it does not run as UID 0 (root) and fail to start the container if it does. If unset or false, no such validation will be performed. May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.
     */
    readonly runAsNonRoot?: boolean;
    /**
     * The UID to run the entrypoint of the container process. Defaults to user specified in image metadata if unspecified. May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.
     * @default user specified in image metadata if unspecified. May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.
     */
    readonly runAsUser?: number;
    /**
     * The SELinux context to be applied to the container. If unspecified, the container runtime will allocate a random SELinux context for each container.  May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.
     */
    readonly seLinuxOptions?: SELinuxOptions;
}
/**
 * volumeDevice describes a mapping of a raw block device within a container.
 */
export interface VolumeDevice {
    /**
     * devicePath is the path inside of the container that the device will be mapped to.
     */
    readonly devicePath?: string;
    /**
     * name must match the name of a persistentVolumeClaim in the pod
     */
    readonly name?: string;
}
/**
 * VolumeMount describes a mounting of a Volume within a container.
 */
export interface VolumeMount {
    /**
     * Path within the container at which the volume should be mounted.  Must not contain ':'.
     */
    readonly mountPath?: string;
    /**
     * mountPropagation determines how mounts are propagated from the host to container and the other way around. When not set, MountPropagationNone is used. This field is beta in 1.10.
     */
    readonly mountPropagation?: string;
    /**
     * This must match the Name of a Volume.
     */
    readonly name?: string;
    /**
     * Mounted read-only if true, read-write otherwise (false or unspecified). Defaults to false.
     * @default false.
     */
    readonly readOnly?: boolean;
    /**
     * Path within the volume from which the container's volume should be mounted. Defaults to "" (volume's root).
     * @default volume's root).
     */
    readonly subPath?: string;
    /**
     * Expanded path within the volume from which the container's volume should be mounted. Behaves similarly to SubPath but environment variable references $(VAR_NAME) are expanded using the container's environment. Defaults to "" (volume's root). SubPathExpr and SubPath are mutually exclusive. This field is alpha in 1.14.
     * @default volume's root). SubPathExpr and SubPath are mutually exclusive. This field is alpha in 1.14.
     */
    readonly subPathExpr?: string;
}
/**
 * PodDNSConfigOption defines DNS resolver options of a pod.
 */
export interface PodDNSConfigOption {
    /**
     * Required.
     */
    readonly name?: string;
    readonly value?: string;
}
/**
 * SELinuxOptions are the labels to be applied to the container
 */
export interface SELinuxOptions {
    /**
     * Level is SELinux level label that applies to the container.
     */
    readonly level?: string;
    /**
     * Role is a SELinux role label that applies to the container.
     */
    readonly role?: string;
    /**
     * Type is a SELinux type label that applies to the container.
     */
    readonly type?: string;
    /**
     * User is a SELinux user label that applies to the container.
     */
    readonly user?: string;
}
/**
 * Sysctl defines a kernel parameter to be set
 */
export interface Sysctl {
    /**
     * Name of a property to set
     */
    readonly name?: string;
    /**
     * Value of a property to set
     */
    readonly value?: string;
}
/**
 * Represents a Persistent Disk resource in AWS.

An AWS EBS disk must exist before mounting to a container. The disk must also be in the same AWS zone as the kubelet. An AWS EBS disk can only be mounted as read/write once. AWS EBS volumes support ownership management and SELinux relabeling.
 */
export interface AWSElasticBlockStoreVolumeSource {
    /**
     * Filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
     */
    readonly fsType?: string;
    /**
     * The partition in the volume that you want to mount. If omitted, the default is to mount by volume name. Examples: For volume /dev/sda1, you specify the partition as "1". Similarly, the volume partition for /dev/sda is "0" (or you can leave the property empty).
     */
    readonly partition?: number;
    /**
     * Specify "true" to force and set the ReadOnly property in VolumeMounts to "true". If omitted, the default is "false". More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
     */
    readonly readOnly?: boolean;
    /**
     * Unique ID of the persistent disk resource in AWS (Amazon EBS volume). More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
     */
    readonly volumeID?: string;
}
/**
 * AzureDisk represents an Azure Data Disk mount on the host and bind mount to the pod.
 */
export interface AzureDiskVolumeSource {
    /**
     * Host Caching mode: None, Read Only, Read Write.
     */
    readonly cachingMode?: string;
    /**
     * The Name of the data disk in the blob storage
     */
    readonly diskName?: string;
    /**
     * The URI the data disk in the blob storage
     */
    readonly diskURI?: string;
    /**
     * Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
     */
    readonly fsType?: string;
    /**
     * Expected values Shared: multiple blob disks per storage account  Dedicated: single blob disk per storage account  Managed: azure managed data disk (only in managed availability set). defaults to shared
     */
    readonly kind?: string;
    /**
     * Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
     * @default false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
     */
    readonly readOnly?: boolean;
}
/**
 * AzureFile represents an Azure File Service mount on the host and bind mount to the pod.
 */
export interface AzureFileVolumeSource {
    /**
     * Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
     * @default false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
     */
    readonly readOnly?: boolean;
    /**
     * the name of secret that contains Azure Storage Account Name and Key
     */
    readonly secretName?: string;
    /**
     * Share Name
     */
    readonly shareName?: string;
}
/**
 * Represents a Ceph Filesystem mount that lasts the lifetime of a pod Cephfs volumes do not support ownership management or SELinux relabeling.
 */
export interface CephFSVolumeSource {
    /**
     * Required: Monitors is a collection of Ceph monitors More info: https://releases.k8s.io/HEAD/examples/volumes/cephfs/README.md#how-to-use-it
     */
    readonly monitors?: string[];
    /**
     * Optional: Used as the mounted root, rather than the full Ceph tree, default is /
     */
    readonly path?: string;
    /**
     * Optional: Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts. More info: https://releases.k8s.io/HEAD/examples/volumes/cephfs/README.md#how-to-use-it
     * @default false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts. More info: https://releases.k8s.io/HEAD/examples/volumes/cephfs/README.md#how-to-use-it
     */
    readonly readOnly?: boolean;
    /**
     * Optional: SecretFile is the path to key ring for User, default is /etc/ceph/user.secret More info: https://releases.k8s.io/HEAD/examples/volumes/cephfs/README.md#how-to-use-it
     */
    readonly secretFile?: string;
    /**
     * Optional: SecretRef is reference to the authentication secret for User, default is empty. More info: https://releases.k8s.io/HEAD/examples/volumes/cephfs/README.md#how-to-use-it
     */
    readonly secretRef?: LocalObjectReference;
    /**
     * Optional: User is the rados user name, default is admin More info: https://releases.k8s.io/HEAD/examples/volumes/cephfs/README.md#how-to-use-it
     */
    readonly user?: string;
}
/**
 * Represents a cinder volume resource in Openstack. A Cinder volume must exist before mounting to a container. The volume must also be in the same region as the kubelet. Cinder volumes support ownership management and SELinux relabeling.
 */
export interface CinderVolumeSource {
    /**
     * Filesystem type to mount. Must be a filesystem type supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://releases.k8s.io/HEAD/examples/mysql-cinder-pd/README.md
     */
    readonly fsType?: string;
    /**
     * Optional: Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts. More info: https://releases.k8s.io/HEAD/examples/mysql-cinder-pd/README.md
     * @default false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts. More info: https://releases.k8s.io/HEAD/examples/mysql-cinder-pd/README.md
     */
    readonly readOnly?: boolean;
    /**
     * Optional: points to a secret object containing parameters used to connect to OpenStack.
     */
    readonly secretRef?: LocalObjectReference;
    /**
     * volume id used to identify the volume in cinder More info: https://releases.k8s.io/HEAD/examples/mysql-cinder-pd/README.md
     */
    readonly volumeID?: string;
}
/**
 * Adapts a ConfigMap into a volume.

The contents of the target ConfigMap's Data field will be presented in a volume as files using the keys in the Data field as the file names, unless the items element is populated with specific mappings of keys to paths. ConfigMap volumes support ownership management and SELinux relabeling.
 */
export interface ConfigMapVolumeSource {
    /**
     * Optional: mode bits to use on created files by default. Must be a value between 0 and 0777. Defaults to 0644. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
     * @default 0644. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
     */
    readonly defaultMode?: number;
    /**
     * If unspecified, each key-value pair in the Data field of the referenced ConfigMap will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified which is not present in the ConfigMap, the volume setup will error unless it is marked optional. Paths must be relative and may not contain the '..' path or start with '..'.
     */
    readonly items?: KeyToPath[];
    /**
     * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     */
    readonly name?: string;
    /**
     * Specify whether the ConfigMap or it's keys must be defined
     */
    readonly optional?: boolean;
}
/**
 * Represents a source location of a volume to mount, managed by an external CSI driver
 */
export interface CSIVolumeSource {
    /**
     * Driver is the name of the CSI driver that handles this volume. Consult with your admin for the correct name as registered in the cluster.
     */
    readonly driver?: string;
    /**
     * Filesystem type to mount. Ex. "ext4", "xfs", "ntfs". If not provided, the empty value is passed to the associated CSI driver which will determine the default filesystem to apply.
     */
    readonly fsType?: string;
    /**
     * NodePublishSecretRef is a reference to the secret object containing sensitive information to pass to the CSI driver to complete the CSI NodePublishVolume and NodeUnpublishVolume calls. This field is optional, and  may be empty if no secret is required. If the secret object contains more than one secret, all secret references are passed.
     */
    readonly nodePublishSecretRef?: LocalObjectReference;
    /**
     * Specifies a read-only configuration for the volume. Defaults to false (read/write).
     * @default false (read/write).
     */
    readonly readOnly?: boolean;
    /**
     * VolumeAttributes stores driver-specific properties that are passed to the CSI driver. Consult your driver's documentation for supported values.
     */
    readonly volumeAttributes?: {
        [key: string]: string;
    };
}
/**
 * DownwardAPIVolumeSource represents a volume containing downward API info. Downward API volumes support ownership management and SELinux relabeling.
 */
export interface DownwardAPIVolumeSource {
    /**
     * Optional: mode bits to use on created files by default. Must be a value between 0 and 0777. Defaults to 0644. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
     * @default 0644. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
     */
    readonly defaultMode?: number;
    /**
     * Items is a list of downward API volume file
     */
    readonly items?: DownwardAPIVolumeFile[];
}
/**
 * Represents an empty directory for a pod. Empty directory volumes support ownership management and SELinux relabeling.
 */
export interface EmptyDirVolumeSource {
    /**
     * What type of storage medium should back this directory. The default is "" which means to use the node's default medium. Must be an empty string (default) or Memory. More info: https://kubernetes.io/docs/concepts/storage/volumes#emptydir
     */
    readonly medium?: string;
    /**
     * Total amount of local storage required for this EmptyDir volume. The size limit is also applicable for memory medium. The maximum usage on memory medium EmptyDir would be the minimum value between the SizeLimit specified here and the sum of memory limits of all containers in a pod. The default is nil which means that the limit is undefined. More info: http://kubernetes.io/docs/user-guide/volumes#emptydir
     */
    readonly sizeLimit?: Quantity;
}
/**
 * Represents a Fibre Channel volume. Fibre Channel volumes can only be mounted as read/write once. Fibre Channel volumes support ownership management and SELinux relabeling.
 */
export interface FCVolumeSource {
    /**
     * Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
     */
    readonly fsType?: string;
    /**
     * Optional: FC target lun number
     */
    readonly lun?: number;
    /**
     * Optional: Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
     * @default false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
     */
    readonly readOnly?: boolean;
    /**
     * Optional: FC target worldwide names (WWNs)
     */
    readonly targetWWNs?: string[];
    /**
     * Optional: FC volume world wide identifiers (wwids) Either wwids or combination of targetWWNs and lun must be set, but not both simultaneously.
     */
    readonly wwids?: string[];
}
/**
 * FlexVolume represents a generic volume resource that is provisioned/attached using an exec based plugin.
 */
export interface FlexVolumeSource {
    /**
     * Driver is the name of the driver to use for this volume.
     */
    readonly driver?: string;
    /**
     * Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". The default filesystem depends on FlexVolume script.
     */
    readonly fsType?: string;
    /**
     * Optional: Extra command options if any.
     */
    readonly options?: {
        [key: string]: string;
    };
    /**
     * Optional: Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
     * @default false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
     */
    readonly readOnly?: boolean;
    /**
     * Optional: SecretRef is reference to the secret object containing sensitive information to pass to the plugin scripts. This may be empty if no secret object is specified. If the secret object contains more than one secret, all secrets are passed to the plugin scripts.
     */
    readonly secretRef?: LocalObjectReference;
}
/**
 * Represents a Flocker volume mounted by the Flocker agent. One and only one of datasetName and datasetUUID should be set. Flocker volumes do not support ownership management or SELinux relabeling.
 */
export interface FlockerVolumeSource {
    /**
     * Name of the dataset stored as metadata -> name on the dataset for Flocker should be considered as deprecated
     */
    readonly datasetName?: string;
    /**
     * UUID of the dataset. This is unique identifier of a Flocker dataset
     */
    readonly datasetUUID?: string;
}
/**
 * Represents a Persistent Disk resource in Google Compute Engine.

A GCE PD must exist before mounting to a container. The disk must also be in the same GCE project and zone as the kubelet. A GCE PD can only be mounted as read/write once or read-only many times. GCE PDs support ownership management and SELinux relabeling.
 */
export interface GCEPersistentDiskVolumeSource {
    /**
     * Filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
     */
    readonly fsType?: string;
    /**
     * The partition in the volume that you want to mount. If omitted, the default is to mount by volume name. Examples: For volume /dev/sda1, you specify the partition as "1". Similarly, the volume partition for /dev/sda is "0" (or you can leave the property empty). More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
     */
    readonly partition?: number;
    /**
     * Unique name of the PD resource in GCE. Used to identify the disk in GCE. More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
     */
    readonly pdName?: string;
    /**
     * ReadOnly here will force the ReadOnly setting in VolumeMounts. Defaults to false. More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
     * @default false. More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
     */
    readonly readOnly?: boolean;
}
/**
 * Represents a volume that is populated with the contents of a git repository. Git repo volumes do not support ownership management. Git repo volumes support SELinux relabeling.

DEPRECATED: GitRepo is deprecated. To provision a container with a git repo, mount an EmptyDir into an InitContainer that clones the repo using git, then mount the EmptyDir into the Pod's container.
 */
export interface GitRepoVolumeSource {
    /**
     * Target directory name. Must not contain or start with '..'.  If '.' is supplied, the volume directory will be the git repository.  Otherwise, if specified, the volume will contain the git repository in the subdirectory with the given name.
     */
    readonly directory?: string;
    /**
     * Repository URL
     */
    readonly repository?: string;
    /**
     * Commit hash for the specified revision.
     */
    readonly revision?: string;
}
/**
 * Represents a Glusterfs mount that lasts the lifetime of a pod. Glusterfs volumes do not support ownership management or SELinux relabeling.
 */
export interface GlusterfsVolumeSource {
    /**
     * EndpointsName is the endpoint name that details Glusterfs topology. More info: https://releases.k8s.io/HEAD/examples/volumes/glusterfs/README.md#create-a-pod
     */
    readonly endpoints?: string;
    /**
     * Path is the Glusterfs volume path. More info: https://releases.k8s.io/HEAD/examples/volumes/glusterfs/README.md#create-a-pod
     */
    readonly path?: string;
    /**
     * ReadOnly here will force the Glusterfs volume to be mounted with read-only permissions. Defaults to false. More info: https://releases.k8s.io/HEAD/examples/volumes/glusterfs/README.md#create-a-pod
     * @default false. More info: https://releases.k8s.io/HEAD/examples/volumes/glusterfs/README.md#create-a-pod
     */
    readonly readOnly?: boolean;
}
/**
 * Represents a host path mapped into a pod. Host path volumes do not support ownership management or SELinux relabeling.
 */
export interface HostPathVolumeSource {
    /**
     * Path of the directory on the host. If the path is a symlink, it will follow the link to the real path. More info: https://kubernetes.io/docs/concepts/storage/volumes#hostpath
     */
    readonly path?: string;
    /**
     * Type for HostPath Volume Defaults to "" More info: https://kubernetes.io/docs/concepts/storage/volumes#hostpath
     * @default More info: https://kubernetes.io/docs/concepts/storage/volumes#hostpath
     */
    readonly type?: string;
}
/**
 * Represents an ISCSI disk. ISCSI volumes can only be mounted as read/write once. ISCSI volumes support ownership management and SELinux relabeling.
 */
export interface ISCSIVolumeSource {
    /**
     * whether support iSCSI Discovery CHAP authentication
     */
    readonly chapAuthDiscovery?: boolean;
    /**
     * whether support iSCSI Session CHAP authentication
     */
    readonly chapAuthSession?: boolean;
    /**
     * Filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#iscsi
     */
    readonly fsType?: string;
    /**
     * Custom iSCSI Initiator Name. If initiatorName is specified with iscsiInterface simultaneously, new iSCSI interface <target portal>:<volume name> will be created for the connection.
     */
    readonly initiatorName?: string;
    /**
     * Target iSCSI Qualified Name.
     */
    readonly iqn?: string;
    /**
     * iSCSI Interface Name that uses an iSCSI transport. Defaults to 'default' (tcp).
     * @default default' (tcp).
     */
    readonly iscsiInterface?: string;
    /**
     * iSCSI Target Lun number.
     */
    readonly lun?: number;
    /**
     * iSCSI Target Portal List. The portal is either an IP or ip_addr:port if the port is other than default (typically TCP ports 860 and 3260).
     */
    readonly portals?: string[];
    /**
     * ReadOnly here will force the ReadOnly setting in VolumeMounts. Defaults to false.
     * @default false.
     */
    readonly readOnly?: boolean;
    /**
     * CHAP Secret for iSCSI target and initiator authentication
     */
    readonly secretRef?: LocalObjectReference;
    /**
     * iSCSI Target Portal. The Portal is either an IP or ip_addr:port if the port is other than default (typically TCP ports 860 and 3260).
     */
    readonly targetPortal?: string;
}
/**
 * Represents an NFS mount that lasts the lifetime of a pod. NFS volumes do not support ownership management or SELinux relabeling.
 */
export interface NFSVolumeSource {
    /**
     * Path that is exported by the NFS server. More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
     */
    readonly path?: string;
    /**
     * ReadOnly here will force the NFS export to be mounted with read-only permissions. Defaults to false. More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
     * @default false. More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
     */
    readonly readOnly?: boolean;
    /**
     * Server is the hostname or IP address of the NFS server. More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
     */
    readonly server?: string;
}
/**
 * PersistentVolumeClaimVolumeSource references the user's PVC in the same namespace. This volume finds the bound PV and mounts that volume for the pod. A PersistentVolumeClaimVolumeSource is, essentially, a wrapper around another type of volume that is owned by someone else (the system).
 */
export interface PersistentVolumeClaimVolumeSource {
    /**
     * ClaimName is the name of a PersistentVolumeClaim in the same namespace as the pod using this volume. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
     */
    readonly claimName?: string;
    /**
     * Will force the ReadOnly setting in VolumeMounts. Default false.
     */
    readonly readOnly?: boolean;
}
/**
 * Represents a Photon Controller persistent disk resource.
 */
export interface PhotonPersistentDiskVolumeSource {
    /**
     * Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
     */
    readonly fsType?: string;
    /**
     * ID that identifies Photon Controller persistent disk
     */
    readonly pdID?: string;
}
/**
 * PortworxVolumeSource represents a Portworx volume resource.
 */
export interface PortworxVolumeSource {
    /**
     * FSType represents the filesystem type to mount Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs". Implicitly inferred to be "ext4" if unspecified.
     */
    readonly fsType?: string;
    /**
     * Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
     * @default false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
     */
    readonly readOnly?: boolean;
    /**
     * VolumeID uniquely identifies a Portworx volume
     */
    readonly volumeID?: string;
}
/**
 * Represents a projected volume source
 */
export interface ProjectedVolumeSource {
    /**
     * Mode bits to use on created files by default. Must be a value between 0 and 0777. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
     */
    readonly defaultMode?: number;
    /**
     * list of volume projections
     */
    readonly sources?: VolumeProjection[];
}
/**
 * Represents a Quobyte mount that lasts the lifetime of a pod. Quobyte volumes do not support ownership management or SELinux relabeling.
 */
export interface QuobyteVolumeSource {
    /**
     * Group to map volume access to Default is no group
     * @default no group
     */
    readonly group?: string;
    /**
     * ReadOnly here will force the Quobyte volume to be mounted with read-only permissions. Defaults to false.
     * @default false.
     */
    readonly readOnly?: boolean;
    /**
     * Registry represents a single or multiple Quobyte Registry services specified as a string as host:port pair (multiple entries are separated with commas) which acts as the central registry for volumes
     */
    readonly registry?: string;
    /**
     * Tenant owning the given Quobyte volume in the Backend Used with dynamically provisioned Quobyte volumes, value is set by the plugin
     */
    readonly tenant?: string;
    /**
     * User to map volume access to Defaults to serivceaccount user
     * @default serivceaccount user
     */
    readonly user?: string;
    /**
     * Volume is a string that references an already created Quobyte volume by name.
     */
    readonly volume?: string;
}
/**
 * Represents a Rados Block Device mount that lasts the lifetime of a pod. RBD volumes support ownership management and SELinux relabeling.
 */
export interface RBDVolumeSource {
    /**
     * Filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#rbd
     */
    readonly fsType?: string;
    /**
     * The rados image name. More info: https://releases.k8s.io/HEAD/examples/volumes/rbd/README.md#how-to-use-it
     */
    readonly image?: string;
    /**
     * Keyring is the path to key ring for RBDUser. Default is /etc/ceph/keyring. More info: https://releases.k8s.io/HEAD/examples/volumes/rbd/README.md#how-to-use-it
     * @default etc/ceph/keyring. More info: https://releases.k8s.io/HEAD/examples/volumes/rbd/README.md#how-to-use-it
     */
    readonly keyring?: string;
    /**
     * A collection of Ceph monitors. More info: https://releases.k8s.io/HEAD/examples/volumes/rbd/README.md#how-to-use-it
     */
    readonly monitors?: string[];
    /**
     * The rados pool name. Default is rbd. More info: https://releases.k8s.io/HEAD/examples/volumes/rbd/README.md#how-to-use-it
     * @default rbd. More info: https://releases.k8s.io/HEAD/examples/volumes/rbd/README.md#how-to-use-it
     */
    readonly pool?: string;
    /**
     * ReadOnly here will force the ReadOnly setting in VolumeMounts. Defaults to false. More info: https://releases.k8s.io/HEAD/examples/volumes/rbd/README.md#how-to-use-it
     * @default false. More info: https://releases.k8s.io/HEAD/examples/volumes/rbd/README.md#how-to-use-it
     */
    readonly readOnly?: boolean;
    /**
     * SecretRef is name of the authentication secret for RBDUser. If provided overrides keyring. Default is nil. More info: https://releases.k8s.io/HEAD/examples/volumes/rbd/README.md#how-to-use-it
     * @default nil. More info: https://releases.k8s.io/HEAD/examples/volumes/rbd/README.md#how-to-use-it
     */
    readonly secretRef?: LocalObjectReference;
    /**
     * The rados user name. Default is admin. More info: https://releases.k8s.io/HEAD/examples/volumes/rbd/README.md#how-to-use-it
     * @default admin. More info: https://releases.k8s.io/HEAD/examples/volumes/rbd/README.md#how-to-use-it
     */
    readonly user?: string;
}
/**
 * ScaleIOVolumeSource represents a persistent ScaleIO volume
 */
export interface ScaleIOVolumeSource {
    /**
     * Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Default is "xfs".
     * @default xfs".
     */
    readonly fsType?: string;
    /**
     * The host address of the ScaleIO API Gateway.
     */
    readonly gateway?: string;
    /**
     * The name of the ScaleIO Protection Domain for the configured storage.
     */
    readonly protectionDomain?: string;
    /**
     * Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
     * @default false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
     */
    readonly readOnly?: boolean;
    /**
     * SecretRef references to the secret for ScaleIO user and other sensitive information. If this is not provided, Login operation will fail.
     */
    readonly secretRef?: LocalObjectReference;
    /**
     * Flag to enable/disable SSL communication with Gateway, default false
     */
    readonly sslEnabled?: boolean;
    /**
     * Indicates whether the storage for a volume should be ThickProvisioned or ThinProvisioned. Default is ThinProvisioned.
     * @default ThinProvisioned.
     */
    readonly storageMode?: string;
    /**
     * The ScaleIO Storage Pool associated with the protection domain.
     */
    readonly storagePool?: string;
    /**
     * The name of the storage system as configured in ScaleIO.
     */
    readonly system?: string;
    /**
     * The name of a volume already created in the ScaleIO system that is associated with this volume source.
     */
    readonly volumeName?: string;
}
/**
 * Adapts a Secret into a volume.

The contents of the target Secret's Data field will be presented in a volume as files using the keys in the Data field as the file names. Secret volumes support ownership management and SELinux relabeling.
 */
export interface SecretVolumeSource {
    /**
     * Optional: mode bits to use on created files by default. Must be a value between 0 and 0777. Defaults to 0644. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
     * @default 0644. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
     */
    readonly defaultMode?: number;
    /**
     * If unspecified, each key-value pair in the Data field of the referenced Secret will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified which is not present in the Secret, the volume setup will error unless it is marked optional. Paths must be relative and may not contain the '..' path or start with '..'.
     */
    readonly items?: KeyToPath[];
    /**
     * Specify whether the Secret or it's keys must be defined
     */
    readonly optional?: boolean;
    /**
     * Name of the secret in the pod's namespace to use. More info: https://kubernetes.io/docs/concepts/storage/volumes#secret
     */
    readonly secretName?: string;
}
/**
 * Represents a StorageOS persistent volume resource.
 */
export interface StorageOSVolumeSource {
    /**
     * Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
     */
    readonly fsType?: string;
    /**
     * Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
     * @default false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
     */
    readonly readOnly?: boolean;
    /**
     * SecretRef specifies the secret to use for obtaining the StorageOS API credentials.  If not specified, default values will be attempted.
     */
    readonly secretRef?: LocalObjectReference;
    /**
     * VolumeName is the human-readable name of the StorageOS volume.  Volume names are only unique within a namespace.
     */
    readonly volumeName?: string;
    /**
     * VolumeNamespace specifies the scope of the volume within StorageOS.  If no namespace is specified then the Pod's namespace will be used.  This allows the Kubernetes name scoping to be mirrored within StorageOS for tighter integration. Set VolumeName to any name to override the default behaviour. Set to "default" if you are not using namespaces within StorageOS. Namespaces that do not pre-exist within StorageOS will be created.
     */
    readonly volumeNamespace?: string;
}
/**
 * Represents a vSphere volume resource.
 */
export interface VsphereVirtualDiskVolumeSource {
    /**
     * Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
     */
    readonly fsType?: string;
    /**
     * Storage Policy Based Management (SPBM) profile ID associated with the StoragePolicyName.
     */
    readonly storagePolicyID?: string;
    /**
     * Storage Policy Based Management (SPBM) profile name.
     */
    readonly storagePolicyName?: string;
    /**
     * Path that identifies vSphere volume vmdk
     */
    readonly volumePath?: string;
}
/**
 * An empty preferred scheduling term matches all objects with implicit weight 0 (i.e. it's a no-op). A null preferred scheduling term matches no objects (i.e. is also a no-op).
 */
export interface PreferredSchedulingTerm {
    /**
     * A node selector term, associated with the corresponding weight.
     */
    readonly preference?: NodeSelectorTerm;
    /**
     * Weight associated with matching the corresponding nodeSelectorTerm, in the range 1-100.
     */
    readonly weight?: number;
}
/**
 * A node selector represents the union of the results of one or more label queries over a set of nodes; that is, it represents the OR of the selectors represented by the node selector terms.
 */
export interface NodeSelector {
    /**
     * Required. A list of node selector terms. The terms are ORed.
     */
    readonly nodeSelectorTerms?: NodeSelectorTerm[];
}
/**
 * The weights of all of the matched WeightedPodAffinityTerm fields are added per-node to find the most preferred node(s)
 */
export interface WeightedPodAffinityTerm {
    /**
     * Required. A pod affinity term, associated with the corresponding weight.
     */
    readonly podAffinityTerm?: PodAffinityTerm;
    /**
     * weight associated with matching the corresponding podAffinityTerm, in the range 1-100.
     */
    readonly weight?: number;
}
/**
 * Defines a set of pods (namely those matching the labelSelector relative to the given namespace(s)) that this pod should be co-located (affinity) or not co-located (anti-affinity) with, where co-located is defined as running on a node whose value of the label with key <topologyKey> matches that of any node on which a pod of the set of pods is running
 */
export interface PodAffinityTerm {
    /**
     * A label query over a set of resources, in this case pods.
     */
    readonly labelSelector?: LabelSelector;
    /**
     * namespaces specifies which namespaces the labelSelector applies to (matches against); null or empty list means "this pod's namespace"
     */
    readonly namespaces?: string[];
    /**
     * This pod should be co-located (affinity) or not co-located (anti-affinity) with the pods matching the labelSelector in the specified namespaces, where co-located is defined as running on a node whose value of the label with key topologyKey matches that of any node on which any of the selected pods is running. Empty topologyKey is not allowed.
     */
    readonly topologyKey?: string;
}
/**
 * EnvVarSource represents a source for the value of an EnvVar.
 */
export interface EnvVarSource {
    /**
     * Selects a key of a ConfigMap.
     */
    readonly configMapKeyRef?: ConfigMapKeySelector;
    /**
     * Selects a field of the pod: supports metadata.name, metadata.namespace, metadata.labels, metadata.annotations, spec.nodeName, spec.serviceAccountName, status.hostIP, status.podIP.
     */
    readonly fieldRef?: ObjectFieldSelector;
    /**
     * Selects a resource of the container: only resources limits and requests (limits.cpu, limits.memory, limits.ephemeral-storage, requests.cpu, requests.memory and requests.ephemeral-storage) are currently supported.
     */
    readonly resourceFieldRef?: ResourceFieldSelector;
    /**
     * Selects a key of a secret in the pod's namespace
     */
    readonly secretKeyRef?: SecretKeySelector;
}
/**
 * ConfigMapEnvSource selects a ConfigMap to populate the environment variables with.

The contents of the target ConfigMap's Data field will represent the key-value pairs as environment variables.
 */
export interface ConfigMapEnvSource {
    /**
     * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     */
    readonly name?: string;
    /**
     * Specify whether the ConfigMap must be defined
     */
    readonly optional?: boolean;
}
/**
 * SecretEnvSource selects a Secret to populate the environment variables with.

The contents of the target Secret's Data field will represent the key-value pairs as environment variables.
 */
export interface SecretEnvSource {
    /**
     * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     */
    readonly name?: string;
    /**
     * Specify whether the Secret must be defined
     */
    readonly optional?: boolean;
}
/**
 * Handler defines a specific action that should be taken
 */
export interface Handler {
    /**
     * One and only one of the following should be specified. Exec specifies the action to take.
     */
    readonly exec?: ExecAction;
    /**
     * HTTPGet specifies the http request to perform.
     */
    readonly httpGet?: HTTPGetAction;
    /**
     * TCPSocket specifies an action involving a TCP port. TCP hooks not yet supported
     */
    readonly tcpSocket?: TCPSocketAction;
}
/**
 * ExecAction describes a "run in container" action.
 */
export interface ExecAction {
    /**
     * Command is the command line to execute inside the container, the working directory for the command  is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
     */
    readonly command?: string[];
}
/**
 * HTTPGetAction describes an action based on HTTP Get requests.
 */
export interface HTTPGetAction {
    /**
     * Host name to connect to, defaults to the pod IP. You probably want to set "Host" in httpHeaders instead.
     */
    readonly host?: string;
    /**
     * Custom headers to set in the request. HTTP allows repeated headers.
     */
    readonly httpHeaders?: HTTPHeader[];
    /**
     * Path to access on the HTTP server.
     */
    readonly path?: string;
    /**
     * Name or number of the port to access on the container. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME.
     */
    readonly port?: IntOrString;
    /**
     * Scheme to use for connecting to the host. Defaults to HTTP.
     * @default HTTP.
     */
    readonly scheme?: string;
}
/**
 * TCPSocketAction describes an action based on opening a socket
 */
export interface TCPSocketAction {
    /**
     * Optional: Host name to connect to, defaults to the pod IP.
     */
    readonly host?: string;
    /**
     * Number or name of the port to access on the container. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME.
     */
    readonly port?: IntOrString;
}
export declare class Quantity {
    static fromString(value: string): Quantity;
    static fromNumber(value: number): Quantity;
    private constructor();
}
/**
 * Adds and removes POSIX capabilities from running containers.
 */
export interface Capabilities {
    /**
     * Added capabilities
     */
    readonly add?: string[];
    /**
     * Removed capabilities
     */
    readonly drop?: string[];
}
/**
 * Maps a string key to a path within a volume.
 */
export interface KeyToPath {
    /**
     * The key to project.
     */
    readonly key?: string;
    /**
     * Optional: mode bits to use on this file, must be a value between 0 and 0777. If not specified, the volume defaultMode will be used. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
     */
    readonly mode?: number;
    /**
     * The relative path of the file to map the key to. May not be an absolute path. May not contain the path element '..'. May not start with the string '..'.
     */
    readonly path?: string;
}
/**
 * DownwardAPIVolumeFile represents information to create the file containing the pod field
 */
export interface DownwardAPIVolumeFile {
    /**
     * Required: Selects a field of the pod: only annotations, labels, name and namespace are supported.
     */
    readonly fieldRef?: ObjectFieldSelector;
    /**
     * Optional: mode bits to use on this file, must be a value between 0 and 0777. If not specified, the volume defaultMode will be used. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
     */
    readonly mode?: number;
    /**
     * Required: Path is  the relative path name of the file to be created. Must not be absolute or contain the '..' path. Must be utf-8 encoded. The first item of the relative path must not start with '..'
     */
    readonly path?: string;
    /**
     * Selects a resource of the container: only resources limits and requests (limits.cpu, limits.memory, requests.cpu and requests.memory) are currently supported.
     */
    readonly resourceFieldRef?: ResourceFieldSelector;
}
/**
 * Projection that may be projected along with other supported volume types
 */
export interface VolumeProjection {
    /**
     * information about the configMap data to project
     */
    readonly configMap?: ConfigMapProjection;
    /**
     * information about the downwardAPI data to project
     */
    readonly downwardAPI?: DownwardAPIProjection;
    /**
     * information about the secret data to project
     */
    readonly secret?: SecretProjection;
    /**
     * information about the serviceAccountToken data to project
     */
    readonly serviceAccountToken?: ServiceAccountTokenProjection;
}
/**
 * A null or empty node selector term matches no objects. The requirements of them are ANDed. The TopologySelectorTerm type implements a subset of the NodeSelectorTerm.
 */
export interface NodeSelectorTerm {
    /**
     * A list of node selector requirements by node's labels.
     */
    readonly matchExpressions?: NodeSelectorRequirement[];
    /**
     * A list of node selector requirements by node's fields.
     */
    readonly matchFields?: NodeSelectorRequirement[];
}
/**
 * Selects a key from a ConfigMap.
 */
export interface ConfigMapKeySelector {
    /**
     * The key to select.
     */
    readonly key?: string;
    /**
     * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     */
    readonly name?: string;
    /**
     * Specify whether the ConfigMap or it's key must be defined
     */
    readonly optional?: boolean;
}
/**
 * ObjectFieldSelector selects an APIVersioned field of an object.
 */
export interface ObjectFieldSelector {
    /**
     * Version of the schema the FieldPath is written in terms of, defaults to "v1".
     */
    readonly apiVersion?: string;
    /**
     * Path of the field to select in the specified API version.
     */
    readonly fieldPath?: string;
}
/**
 * ResourceFieldSelector represents container resources (cpu, memory) and their output format
 */
export interface ResourceFieldSelector {
    /**
     * Container name: required for volumes, optional for env vars
     */
    readonly containerName?: string;
    /**
     * Specifies the output format of the exposed resources, defaults to "1"
     */
    readonly divisor?: Quantity;
    /**
     * Required: resource to select
     */
    readonly resource?: string;
}
/**
 * SecretKeySelector selects a key of a Secret.
 */
export interface SecretKeySelector {
    /**
     * The key of the secret to select from.  Must be a valid secret key.
     */
    readonly key?: string;
    /**
     * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     */
    readonly name?: string;
    /**
     * Specify whether the Secret or it's key must be defined
     */
    readonly optional?: boolean;
}
/**
 * HTTPHeader describes a custom header to be used in HTTP probes
 */
export interface HTTPHeader {
    /**
     * The header field name
     */
    readonly name?: string;
    /**
     * The header field value
     */
    readonly value?: string;
}
/**
 * Adapts a ConfigMap into a projected volume.

The contents of the target ConfigMap's Data field will be presented in a projected volume as files using the keys in the Data field as the file names, unless the items element is populated with specific mappings of keys to paths. Note that this is identical to a configmap volume source without the default mode.
 */
export interface ConfigMapProjection {
    /**
     * If unspecified, each key-value pair in the Data field of the referenced ConfigMap will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified which is not present in the ConfigMap, the volume setup will error unless it is marked optional. Paths must be relative and may not contain the '..' path or start with '..'.
     */
    readonly items?: KeyToPath[];
    /**
     * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     */
    readonly name?: string;
    /**
     * Specify whether the ConfigMap or it's keys must be defined
     */
    readonly optional?: boolean;
}
/**
 * Represents downward API info for projecting into a projected volume. Note that this is identical to a downwardAPI volume source without the default mode.
 */
export interface DownwardAPIProjection {
    /**
     * Items is a list of DownwardAPIVolume file
     */
    readonly items?: DownwardAPIVolumeFile[];
}
/**
 * Adapts a secret into a projected volume.

The contents of the target Secret's Data field will be presented in a projected volume as files using the keys in the Data field as the file names. Note that this is identical to a secret volume source without the default mode.
 */
export interface SecretProjection {
    /**
     * If unspecified, each key-value pair in the Data field of the referenced Secret will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified which is not present in the Secret, the volume setup will error unless it is marked optional. Paths must be relative and may not contain the '..' path or start with '..'.
     */
    readonly items?: KeyToPath[];
    /**
     * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     */
    readonly name?: string;
    /**
     * Specify whether the Secret or its key must be defined
     */
    readonly optional?: boolean;
}
/**
 * ServiceAccountTokenProjection represents a projected service account token volume. This projection can be used to insert a service account token into the pods runtime filesystem for use against APIs (Kubernetes API Server or otherwise).
 */
export interface ServiceAccountTokenProjection {
    /**
     * Audience is the intended audience of the token. A recipient of a token must identify itself with an identifier specified in the audience of the token, and otherwise should reject the token. The audience defaults to the identifier of the apiserver.
     */
    readonly audience?: string;
    /**
     * ExpirationSeconds is the requested duration of validity of the service account token. As the token approaches expiration, the kubelet volume plugin will proactively rotate the service account token. The kubelet will start trying to rotate the token if the token is older than 80 percent of its time to live or if the token is older than 24 hours.Defaults to 1 hour and must be at least 10 minutes.
     * @default 1 hour and must be at least 10 minutes.
     */
    readonly expirationSeconds?: number;
    /**
     * Path is the path relative to the mount point of the file to project the token into.
     */
    readonly path?: string;
}
/**
 * A node selector requirement is a selector that contains values, a key, and an operator that relates the key and values.
 */
export interface NodeSelectorRequirement {
    /**
     * The label key that the selector applies to.
     */
    readonly key?: string;
    /**
     * Represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists, DoesNotExist. Gt, and Lt.
     */
    readonly operator?: string;
    /**
     * An array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. If the operator is Gt or Lt, the values array must have a single element, which will be interpreted as an integer. This array is replaced during a strategic merge patch.
     */
    readonly values?: string[];
}
