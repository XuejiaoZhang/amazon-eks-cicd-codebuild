// generated by cdk8s

import { ApiObject } from 'cdk8s';
import { Construct } from '@aws-cdk/core';


/**
 * Role is a namespaced, logical grouping of PolicyRules that can be referenced as a unit by a RoleBinding.
 */
export class Role extends ApiObject {
  public constructor(scope: Construct, ns: string, options: RoleOptions) {
    super(scope, ns, {
      ...options,
      kind: 'Role',
      apiVersion: 'rbac.authorization.k8s.io/v1alpha1',
    });
  }
}

/**
 * Role is a namespaced, logical grouping of PolicyRules that can be referenced as a unit by a RoleBinding.
 */
export interface RoleOptions {
  /**
   * Standard object's metadata.
   */
  readonly metadata?: ObjectMeta;

  /**
   * Rules holds all the PolicyRules for this Role
   */
  readonly rules?: PolicyRule[];

}

/**
 * ObjectMeta is metadata that all persisted resources must have, which includes all objects users must create.
 */
export interface ObjectMeta {
  /**
   * Annotations is an unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: http://kubernetes.io/docs/user-guide/annotations
   */
  readonly annotations?: { [key: string]: string };

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
  readonly labels?: { [key: string]: string };

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
 * PolicyRule holds information that describes a policy rule, but does not contain information about who the rule applies to or which namespace the rule applies to.
 */
export interface PolicyRule {
  /**
   * APIGroups is the name of the APIGroup that contains the resources.  If multiple API groups are specified, any action requested against one of the enumerated resources in any API group will be allowed.
   */
  readonly apiGroups?: string[];

  /**
   * NonResourceURLs is a set of partial urls that a user should have access to.  *s are allowed, but only as the full, final step in the path This name is intentionally different than the internal type so that the DefaultConvert works nicely and because the ordering may be different. Since non-resource URLs are not namespaced, this field is only applicable for ClusterRoles referenced from a ClusterRoleBinding. Rules can either apply to API resources (such as "pods" or "secrets") or non-resource URL paths (such as "/api"),  but not both.
   */
  readonly nonResourceURLs?: string[];

  /**
   * ResourceNames is an optional white list of names that the rule applies to.  An empty set means that everything is allowed.
   */
  readonly resourceNames?: string[];

  /**
   * Resources is a list of resources this rule applies to.  ResourceAll represents all resources.
   */
  readonly resources?: string[];

  /**
   * Verbs is a list of Verbs that apply to ALL the ResourceKinds and AttributeRestrictions contained in this rule.  VerbAll represents all kinds.
   */
  readonly verbs?: string[];

}

/**
 * Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.
 */
export type Time = Date;

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
export type Fields = "unknown [object Object]";

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

