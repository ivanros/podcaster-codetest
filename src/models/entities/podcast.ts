export interface Attributes {
  'im:id'?: string;
  label?: string;
  term?: string;
}

export interface PodcastProperty {
  label: string;
  attributes: Partial<Attributes>;
}

export interface Podcast {
  category: Omit<PodcastProperty, 'label'>;
  id: PodcastProperty;
  'im:artist': Omit<PodcastProperty, 'attributes'>;
  'im:contentType': Omit<PodcastProperty, 'label'>;
  'im:image': Array<PodcastProperty>;
  'im:name': Omit<PodcastProperty, 'attributes'>;
  'im:price': PodcastProperty;
  'im:releaseDate': PodcastProperty;
  link: Omit<PodcastProperty, 'label'>;
  rights: Omit<PodcastProperty, 'attributes'>;
  summary: Omit<PodcastProperty, 'attributes'>;
  title: Omit<PodcastProperty, 'attributes'>;
}
