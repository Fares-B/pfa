<?php

namespace App\Form;

use App\Entity\Establishment;
use App\Entity\Table;
use App\Repository\EstablishmentRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class TableType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $this->user = $options['user'];
        $builder
            ->add('number', TextType::class, [
                "label" => "Numéro",
                "label_attr" => ["class" => "block text-gray-700 text-sm font-bold mb-2"],
                'attr' => ['class' => 'mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'],
            ])
            ->add('establishment', EntityType::class, [
                'class' => Establishment::class,
                'query_builder' => function (EstablishmentRepository $a) {
                    return $a->createQueryBuilder('e')
                        ->where('e.user = :user')
                        ->setParameter('user', $this->user)
                    ;
                },
                'choice_label' => 'name',
                'multiple' => false,
                'expanded' => false,
                'label' => 'Etablissement',
                "label_attr" => ["class" => "block text-gray-700 text-sm font-bold mb-2"],
                'attr' => ['class' => 'mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'],
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Table::class,
            'user' => null,
        ]);
    }
}
