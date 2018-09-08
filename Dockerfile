FROM alpine:latest


ENV KUBECONFIG /root/.kube/kubeconfig

RUN \
	mkdir /root/bin /aws; \
	apk -Uuv add groff less bash python py-pip jq curl docker && \
	pip install --upgrade pip; \
	pip install awscli && \
	apk --purge -v del py-pip && \
	rm /var/cache/apk/*

ADD https://amazon-eks.s3-us-west-2.amazonaws.com/1.10.3/2018-07-26/bin/linux/amd64/kubectl /usr/bin/kubectl
ADD  https://amazon-eks.s3-us-west-2.amazonaws.com/1.10.3/2018-07-26/bin/linux/amd64/aws-iam-authenticator /usr/bin/aws-iam-authenticator

RUN chmod a+x /usr/bin/kubectl /usr/bin/aws-iam-authenticator

COPY kubeconfig /root/.kube/kubeconfig
COPY entrypoint.sh /root/bin/entrypoint.sh

ENTRYPOINT ["/root/bin/entrypoint.sh"]
