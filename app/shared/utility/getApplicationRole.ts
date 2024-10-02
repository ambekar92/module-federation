export function getApplicationRole(application: any, userId: number): string | undefined {
  if(!application || !userId || !application?.application_contributor || !application?.application_contributor.length) {return undefined;}
  return application?.application_contributor.find(
    (contributor: any) => contributor.user.id === userId
  )?.application_role.name;
}

export function checkUserPermissionSlug(session: any, slugs: string | string[]): boolean {
  const slugArray = Array.isArray(slugs) ? slugs : [slugs];
  return session?.permissions?.some(
    (permission: any) => slugArray.some(slug => permission.slug.includes(slug))
  ) || false;
}
